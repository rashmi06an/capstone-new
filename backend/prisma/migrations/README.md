# Prisma Migrations

## Initial Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE freelanch_db;
   ```

2. Update your `.env` file with your database connection string:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/freelanch_db"
   ```

3. Run the migration:
   ```bash
   npm run prisma:migrate
   ```

   Or manually:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

## Migration Commands

- Create a new migration: `npx prisma migrate dev --name migration_name`
- Apply migrations: `npx prisma migrate deploy`
- Reset database: `npx prisma migrate reset`
- View migrations: `npx prisma migrate status`

