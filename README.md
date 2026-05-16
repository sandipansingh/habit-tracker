# Habit Tracker

Full-stack habit tracker with a React + Vite frontend and an Express + Drizzle backend.

## Project Structure

- `client`: React 19, TypeScript, Vite, Tailwind UI
- `server`: Express 5, TypeScript, Drizzle ORM, PostgreSQL

## Prerequisites

- Node.js for the frontend toolchain
- Bun for the backend scripts in `server/package.json`
- PostgreSQL

## Environment Setup

1. Copy `server/.env.example` to `server/.env`.
2. Copy `client/.env.example` to `client/.env`.
3. Set a real `JWT_SECRET` before running the backend outside local development.
4. Update `DATABASE_URL`, `CLIENT_URL`, and `ALLOWED_ORIGINS` for your environment.

## Install

```bash
cd client
npm install
cd ../server
bun install
```

## Run Locally

Frontend:

```bash
cd client
npm run dev
```

Backend:

```bash
cd server
bun run dev
```

## Database

Run migrations after updating the schema:

```bash
cd server
bun run db:migrate
```

## Quality Checks

Frontend:

```bash
cd client
npm run lint
npm run build
```

Backend:

```bash
cd server
bun run build
```

## Wakatime Stats
<img width="1906" height="865" alt="image" src="https://github.com/user-attachments/assets/b3f0b3e3-25b9-4b51-9328-62add24bf1d4" />

## Demo
https://github.com/user-attachments/assets/b0d158e6-84a4-4de9-ab23-f353571f051b