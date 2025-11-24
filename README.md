# Habit_Tracker-ITSC-4155 (React + FastAPI)
A habit-tracking app where users set goals (exercise, water, reading, sleep), track daily progress, see streaks, and view progress via charts/dashboards. The goal is to motivate consistent habits.

- Frontend: React (Vite), React Query, Axios
- Backend: FastAPI (Python), SQLAlchemy, PostgreSQL
- Dev UX: One command on Windows via PowerShell

## Live Version
Try it out live here: [Habit Tracker](https://habit-tracker-itsc-4155.vercel.app/)

## Prereqs
- Python 3.12 (on PATH)
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
This will install all dependencies, including the correct versions of React, React DOM, and React Router.

### If you encounter "Invalid hook call" errors:
- Delete the node_modules folder inside habit-web/
- Run npm install again inside habit-web/

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
2. Open pgAdmin and connect to your local server (Port 5173)
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
2. Add the following line, replacing `<your_database_url>` with your PostgreSQL URL (replace username, password, and localhost port:

- DATABASE_URL=postgresql://username:password@localhost:5173/habit_tracker

3. The backend requires a `SECRET_KEY`
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```
This will print a 64-character hexadecimal string. Copy it and add it to your .env file:

```env
SECRET_KEY=<paste-your-generated-key-here>
```

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

## 8) Database Migrations with Alembic
Create a migration:
```powershell
alembic revision --autogenerate -m "Migration description"
```

Apply migrations to database:
```powershell
alembic upgrade head
```

Get the latest version of the database:
```powershell
alembic current
```

To ensure your database is at the latest migration:
```powershell
alembic upgrade head
```

## Backend URLs
- API root: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
