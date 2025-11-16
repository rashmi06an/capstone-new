# Quick Start Guide

## Backend Setup (Required First!)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Set Up Environment File
```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your database credentials:
```env
DATABASE_URL="mysql://username:password@localhost:3306/freelanch_db"
JWT_SECRET="your-secret-key-here-make-it-long-and-random"
PORT=5000
```

**Important:** 
- Replace `username` and `password` with your MySQL credentials
- Replace `freelanch_db` with your database name (or create it first)
- Make `JWT_SECRET` a long random string

### Step 4: Create Database (if not exists)
```sql
CREATE DATABASE freelanch_db;
```

### Step 5: Generate Prisma Client
```bash
npm run prisma:generate
```

### Step 6: Run Database Migrations
```bash
npm run prisma:migrate
```

### Step 7: Start the Backend Server
```bash
npm run dev
```

You should see: `Server is running on port 5000`

**Keep this terminal window open!** The backend must be running for the frontend to work.

---

## Frontend Setup

### Step 1: Open a NEW Terminal Window
Keep the backend running in the first terminal.

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies (if not already done)
```bash
npm install
```

### Step 4: Set Up Environment File (Optional - defaults should work)
```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` if needed (default should work for local development):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 5: Start the Frontend Server
```bash
npm run dev
```

You should see: `Ready - started server on 0.0.0.0:3000`

### Step 6: Open Your Browser
Go to: `http://localhost:3000`

---

## Troubleshooting

### Backend Won't Start

1. **Check if port 5000 is already in use:**
   ```bash
   lsof -i :5000
   ```
   If something is using it, either stop that process or change PORT in `.env`

2. **Check if .env file exists:**
   ```bash
   ls -la backend/.env
   ```

3. **Check database connection:**
   - Make sure MySQL is running
   - Verify DATABASE_URL in `.env` is correct
   - Test connection: `mysql -u username -p -h localhost`

4. **Check Prisma Client:**
   ```bash
   cd backend
   npm run prisma:generate
   ```

### Frontend Shows Network Error

1. **Make sure backend is running:**
   - Check terminal where you ran `npm run dev` in backend folder
   - Should see "Server is running on port 5000"

2. **Test backend directly:**
   - Open browser: `http://localhost:5000/health`
   - Should see: `{"status":"OK","message":"Freelanch API is running"}`

3. **Check API URL:**
   - Verify `frontend/.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
   - Or check browser console for the actual API URL being used

4. **Check CORS:**
   - Backend has CORS enabled, but if issues persist, check browser console

### Database Errors

1. **Database doesn't exist:**
   ```sql
   CREATE DATABASE freelanch_db;
   ```

2. **Migration errors:**
   ```bash
   cd backend
   npm run prisma:migrate reset  # WARNING: This deletes all data
   ```

3. **Prisma Client not generated:**
   ```bash
   cd backend
   npm run prisma:generate
   ```

---

## Testing the Setup

1. **Backend Health Check:**
   - Visit: `http://localhost:5000/health`
   - Should return JSON with status OK

2. **Frontend:**
   - Visit: `http://localhost:3000`
   - Should see the landing page

3. **Signup:**
   - Click "Sign Up"
   - Fill in the form
   - Should create account and redirect to dashboard

---

## Common Issues

### "Cannot find module '@prisma/client'"
```bash
cd backend
npm install
npm run prisma:generate
```

### "Environment variable not found: DATABASE_URL"
- Make sure `.env` file exists in `backend/` directory
- Check that it has `DATABASE_URL=...`

### "Port 5000 already in use"
- Change `PORT=5001` in `backend/.env`
- Update `frontend/.env.local` to match: `NEXT_PUBLIC_API_URL=http://localhost:5001/api`

### "Network error" in frontend
- Backend must be running first
- Check both servers are running
- Verify API URL matches backend port

