# Backend Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update with your database credentials:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/freelanch_db"
   JWT_SECRET="your-very-secure-secret-key-here"
   PORT=5000
   ```

   **Important:** 
   - Replace `username` and `password` with your MySQL credentials
   - Replace `freelanch_db` with your database name
   - Change `JWT_SECRET` to a secure random string (use a password generator)

## Step 3: Database Setup

1. Create your MySQL database:
   ```sql
   CREATE DATABASE freelanch_db;
   ```

2. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

3. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

   This will create all the necessary tables in your database.

## Step 4: (Optional) Open Prisma Studio
To view and manage your database visually:
```bash
npm run prisma:studio
```

This will open Prisma Studio at `http://localhost:5555`

## Step 5: Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## Health Check
Visit `http://localhost:5000/health` to verify the server is running.

## Troubleshooting

### Database Connection Issues
- Verify your MySQL server is running
- Check that the database exists
- Verify username, password, and database name in `.env`
- Ensure MySQL is accessible on the specified host and port

### Migration Issues
- Make sure your database is empty or you're okay with resetting it
- If you need to reset: `npx prisma migrate reset` (WARNING: This deletes all data)

### Port Already in Use
- Change the `PORT` in `.env` to a different port (e.g., 5001)

