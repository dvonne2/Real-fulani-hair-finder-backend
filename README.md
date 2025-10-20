# Fulani Hair Finder - Backend API

Backend API for the Fulani Hair Finder application, handling quiz logic, hair condition diagnosis, and order processing.

## 🔗 Related Repositories

- **Frontend Application:** [Real-fulani-hair-finder](https://github.com/dvonne2/Real-fulani-hair-finder)

## 🏗️ Tech Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Containerization:** Docker & Docker Compose

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or use Docker)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Docker Setup
```bash
# Start all services (API + PostgreSQL)
docker-compose up -d

# Run migrations in container
docker-compose exec api npm run db:migrate
```

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run db:migrate` - Run database migrations
- `npm run db:migrate:undo` - Rollback last migration
- `npm run db:seed` - Seed database with initial data

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/fulani_db
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

## 📚 API Documentation

(Add your API endpoints documentation here)

## 🔐 Security

- Environment variables are gitignored
- Database credentials must be secured
- JWT tokens for authentication
- Input validation on all endpoints

## 📦 Database

### Migrations
```bash
# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```
