# Habit_Tracker-ITSC-4155 (React + FastAPI)
A habit-tracking app where users set goals (exercise, water, reading, sleep), track daily progress, see streaks, and view progress via charts/dashboards. The goal is to motivate consistent habits.

- Frontend: React (Vite), React Query, Axios
- Backend: FastAPI (Python), SQLAlchemy, PostgreSQL
- Dev UX: One command on Windows via PowerShell

## Live Version
Try it out live here: [Habit Tracker](https://habit-tracker-itsc-4155.vercel.app/)

## Prereqs
- Python 3.10+ (on PATH)
- Node 18+
- PostgreSQL installed locally
# 

# Steps For Setup:

## 1) Clone the repo
- Clone! Download the zip! whichever you prefer!
- Remember its easier to just do it from github desktop directly.

# Frontend Setup

## 2) Setup in PowerShell
- remember to cd to wherever you put this folder on your computer
```powershell
npm run setup
npm run dev 
```

## 3) Open Front-end
- Front-end: http://localhost:5173

# Backend Setup

## 4) Change Directory to /backend
```bash
cd backend
```

## 5) Create the PostgreSQL database

You can create the `habit_tracker` database in one of two ways:

### Option A — Using pgAdmin (easiest)
1. Download pgAdmin (GUI for PostgreSQL)
2. Open pgAdmin and connect to your local server
3. Right-click “Databases” → “Create” → “Database…”
4. Name it: `habit_tracker`
5. Save

### Option B — Using psql (command line)

```powershell
psql -U postgres
```

Inside psql:

```sql
CREATE DATABASE habit_tracker;
\q
```

### Setup Environment Variables

1. In the `backend/` folder, create a file named `.env`.
2. Add the following line, replacing `<your_database_url>` with your PostgreSQL URL:

- DATABASE_URL=postgresql://username:password@localhost:5432/habit_tracker

This ensures everyone can run the backend locally without committing sensitive credentials.

## 6) Setup Backend Environment
Inside /backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
```

## 7) Run Backend
Inside /backend

```powershell
uvicorn app:app --reload
```

## Backend URLs
- API root: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
