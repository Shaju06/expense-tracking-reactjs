#  FinTrack — Full-Stack Expense Tracking App

A modern full-stack expense tracking application built with React + TypeScript, Express + Prisma + PostgreSQL, fully containerized using Docker, and deployed on Railway.

FinTrack includes secure authentication, expense insights, categories, interactive charts, and a smooth UI with dark-mode–first design.

# Key Features

  ### Authentication

- Login with JWT (access + refresh tokens).
- HttpOnly secure cookie storage.
- Fully protected API routes

###  Expense Tracking
-	Add Cash-In or Cash-Out
-	Category, amount, date, notes
-	Edit or delete categories
-	Recent transactions list
  
  ### Dashboard & Insights
-	6-Month Trend Bar Chart
-	Category Breakdown Donut Chart
-	Monthly summary: Total In, Total Out, Net Balance
-	“No Data” fallbacks for new users

### Frontend UI
-	Fully responsive dark UI (TailwindCSS)
-	Clean cards, charts, and forms
-	React Hook Form + Zod validations

### Backend
-	Express.js REST API
-	Prisma ORM + PostgreSQL
-	Cookie-based authentication
-	Secure CORS setup for Railway

### DevOps / Deployment
-	Fully Dockerized (frontend + backend)
-	NGINX serving React build
-	Railway for hosting + DB
-	Prisma migrations + seeders

## Project Structure
```bash    /
├── frontend/              # React + TypeScript + Tailwind + NGINX
│   ├── src/
│   ├── package.json
│   └── Dockerfile.prod
│
├── backend/               # Express + Prisma + JWT
│   ├── src/
│   ├── prisma/schema.prisma
│   ├── Dockerfile.prod
│   └── package.json
│
└── docker-compose.yml     # Local development environment

```

# How to Use the App
1.	Login using your email + password
2.	Explore the Dashboard with monthly summaries and charts
3.	Add a new Expense with category, amount, date, etc.
4.	Manage Categories (create/edit/delete)
5.	Browse Recent Transactions or filter by month

# Running Locally (Development)
```bash
docker compose up -d db
npm run dev  //frontend/backend

```


## Running with Docker (Production Mode)

### Backend
```
docker build -t expense-backend ./backend
docker run -p 4000:4000 expense-backend
```

### Frotend
```
docker build -t expense-frontend ./frontend
docker run -p 80:80 expense-frontend
```
