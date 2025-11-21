from domain import HabitTracker
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import datetime
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from database import engine, Base, get_db
import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Habit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tracker = HabitTracker()


# Pydantic schemas for request/response
class HabitCreate(BaseModel):
    name: str
    category: Optional[str] = None
    goal: Optional[str] = None


class HabitLogResponse(BaseModel):
    completion_date: str

    class Config:
        from_attributes = True


class HabitResponse(BaseModel):
    id: Optional[int] = None
    name: str
    streak: int
    logs: List[str]  # List of date strings (ISO dates for compatibility with existing UI)
    category: Optional[str] = None
    goal: Optional[str] = None
    history: List[bool] = []

    class Config:
        from_attributes = True


def get_last_7_days_history(logs):
    """Return a list of 7 booleans for the last 7 days including today.

    Each element represents whether the habit was completed on that day.
    The list is ordered from oldest to newest, so index 6 is today.
    """
    log_dates = {log.completion_date for log in logs}
    today = datetime.date.today()
    history = []
    for i in range(6, -1, -1):
        d = today - datetime.timedelta(days=i)
        history.append(d in log_dates)
    return history


@app.get("/")
def root():
    return {"message": "Habit API up. See /docs"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/habits", response_model=List[HabitResponse])
def list_habits(db: Session = Depends(get_db)):
    """List habits for both UIs.

    Returns a superset of fields so that:
    - the original habit-web UI can keep using name/streak/logs
    - the new PG UI can use id/category/goal/history
    """
    habits = db.query(models.Habit).all()

    result = []
    for habit in habits:
        logs = list(habit.logs)
        result.append(
            {
                "id": habit.id,
                "name": habit.name,
                "streak": habit.streak,
                "logs": [log.completion_date.isoformat() for log in logs],
                "category": habit.category or "Health",
                "goal": habit.goal or "Daily",
                "history": get_last_7_days_history(logs),
            }
        )

    return result


@app.post("/habits", response_model=HabitResponse)
def create_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    """Create a habit.

    - Keeps compatibility with the original UI which only sends a name.
    - Allows the new UI to send optional category and goal fields.
    """
    # Check if habit already exists
    existing = db.query(models.Habit).filter(models.Habit.name == habit.name).first()
    if existing:
        raise HTTPException(status_code=409, detail="Habit already exists")

    # Create new habit with optional category/goal
    new_habit = models.Habit(
        name=habit.name,
        streak=0,
        category=habit.category or "Health",
        goal=habit.goal or "Daily",
    )
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    logs: list[models.HabitLog] = list(new_habit.logs)
    return {
        "id": new_habit.id,
        "name": new_habit.name,
        "streak": new_habit.streak,
        "logs": [log.completion_date.isoformat() for log in logs],
        "category": new_habit.category,
        "goal": new_habit.goal,
        "history": get_last_7_days_history(logs),
    }


@app.post("/habits/{name}/complete", response_model=HabitResponse)
def complete_habit(name: str, db: Session = Depends(get_db)):
    """Toggle completion for *today* for the given habit.

    - If there is already a log for today, it is removed (toggled off).
    - If there is no log for today, a new one is created (toggled on).
    This keeps the original UI behaviour of "complete" but also supports
    the PG UI which expects a toggle.
    """
    # Find habit
    habit = db.query(models.Habit).filter(models.Habit.name == name).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    today = datetime.date.today()

    # Check if already logged today
    existing_log = (
        db.query(models.HabitLog)
        .filter(
            models.HabitLog.habit_id == habit.id,
            models.HabitLog.completion_date == today,
        )
        .first()
    )

    if existing_log:
        # Toggle off: remove today's log
        db.delete(existing_log)
        db.commit()
    else:
        # Toggle on: create new log for today
        new_log = models.HabitLog(habit_id=habit.id, completion_date=today)
        db.add(new_log)
        db.commit()

    db.refresh(habit)
    logs: list[models.HabitLog] = list(habit.logs)

    # Derive history for the last 7 days
    history = get_last_7_days_history(logs)

    # For streak we continue to use the persisted value for backward compatibility.
    # (Optionally this could be recalculated from logs in the future.)
    return {
        "id": habit.id,
        "name": habit.name,
        "streak": habit.streak,
        "logs": [log.completion_date.isoformat() for log in logs],
        "category": habit.category or "Health",
        "goal": habit.goal or "Daily",
        "history": history,
    }


@app.delete("/habits/{name}")
def delete_habit(name: str, db: Session = Depends(get_db)):
    habit = db.query(models.Habit).filter(models.Habit.name == name).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()

    return {"ok": True}

@app.delete("/habits/id/{habit_id}")
def delete_habit_by_id(habit_id: int, db: Session = Depends(get_db)):
    """Delete a habit by numeric ID.

    This route is used by the PG UI while the original /habits/{name}
    route continues to support the existing habit-web UI.
    """
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()

    return {"ok": True}
