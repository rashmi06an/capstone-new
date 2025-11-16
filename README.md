# Freelanch – A Smart Freelance Management System

Freelanch is a comprehensive freelance management platform that helps freelancers manage clients, projects, tasks, and invoices all in one place.

## Features

- **Authentication & Authorization**: Secure JWT-based login/signup with role-based access (Freelancer/Admin)
- **Client Management**: Full CRUD operations with filtering, searching, and sorting
- **Project Management**: Track projects with budgets, deadlines, and status
- **Task Management**: Organize tasks with priorities, due dates, and status tracking
- **Invoice Management**: Generate and download invoices as PDF
- **Analytics Dashboard**: Visual reports of income and productivity trends
- **Modern UI**: Sleek black-glass interface with silver and neon blue highlights

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TailwindCSS
- Chart.js for analytics
- jsPDF for invoice generation

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL Database
- JWT Authentication

## Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URL="mysql://user:password@localhost:3306/freelanch_db"
JWT_SECRET="your-secret-key-change-in-production"
PORT=5000
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. (Optional) Open Prisma Studio to view your database:
```bash
npm run prisma:studio
```

7. Start the development server:
```bash
npm run dev
```

The backend API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Clients
- `GET /api/clients` - Get all clients (with filtering, searching, sorting)
- `GET /api/clients/:id` - Get client by ID
- `POST /api/clients` - Create a new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client (Admin only)

### Projects
- `GET /api/projects` - Get all projects (with filtering, searching, sorting)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering, searching, sorting)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Invoices
- `GET /api/invoices` - Get all invoices (with filtering, searching, sorting)
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create a new invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Analytics
- `GET /api/analytics/income` - Get income and productivity analytics

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy

### Backend (Render/Railway)

1. Push your code to GitHub
2. Create a new Web Service on Render/Railway
3. Connect your GitHub repository
4. Set environment variables:
   - `DATABASE_URL` - Your MySQL database URL
   - `JWT_SECRET` - Your JWT secret key
   - `PORT` - Port number (usually auto-set)
5. Set build command: `cd backend && npm install && npm run prisma:generate`
6. Set start command: `cd backend && npm start`
7. Deploy

### Database (PlanetScale/MySQL)

1. Create a MySQL database on PlanetScale or your preferred provider
2. Update the `DATABASE_URL` in your backend environment variables
3. Run migrations: `npm run prisma:migrate`

## License

ISC
