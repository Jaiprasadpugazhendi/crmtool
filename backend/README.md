# SalesAI CRM Backend

Production-ready backend for SalesAI CRM, built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based auth with Access/Refresh tokens.
- **Role-Based Access Control**: Admin, Manager, Agent roles.
- **Modules**: Leads, Customers, Deals, Tasks, Activity Logs.
- **Security**: Helmet, Rate Limiting, Input Validation (Zod).
- **Logging**: Winston logger.

## Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

## Setup

1.  **Navigate to backend directory**:
    ```bash
    cd backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    - Rename `.env.example` to `.env` (already created if using generation script).
    - Update `MONGO_URI` if needed.

4.  **Seed Database (Optional)**:
    Populate the database with initial users (Admin, Manager, Agent) and sample data.
    ```bash
    npm run seed
    ```
    *Credentials created:*
    - **Admin**: admin@salesai.com / password123
    - **Manager**: manager@salesai.com / password123
    - **Agent**: agent@salesai.com / password123

## Running the Server

- **Development Mode**:
    ```bash
    npm run dev
    ```
    Server runs on `http://localhost:5000`.

- **Production Mode**:
    ```bash
    npm start
    ```

## API Documentation

The API follows RESTful standards.
Base URL: `/api/v1`

### Key Endpoints

- **Auth**:
    - `POST /auth/register`
    - `POST /auth/login`
    - `GET /auth/me`

- **Leads**:
    - `GET /leads`
    - `POST /leads`
    - `POST /leads/:id/convert` (Convert to Customer)

- **Customers**:
    - `GET /customers`
    - `POST /customers`

- **Deals**:
    - `GET /deals`
    - `POST /deals`

- **Tasks**:
    - `GET /tasks`
    - `POST /tasks`

## Project Structure

```
src/
 ├── config/        # Database and logger config
 ├── controllers/   # Request handlers
 ├── services/      # Business logic
 ├── models/        # Mongoose models
 ├── routes/        # API Routes
 ├── middlewares/   # Auth, Error, Validation middlewares
 ├── utils/         # Helper functions
 ├── validations/   # Zod schemas
 ├── app.js         # Express app setup
 └── server.js      # Server entry point
```

## Postman Collection

Import `postman_collection.json` into Postman to test the API.
