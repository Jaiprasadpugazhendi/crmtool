# SalesAI CRM - Complete Setup Guide

This guide will help you set up and run the complete SalesAI CRM application (Frontend + Backend).

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Local installation or MongoDB Atlas account) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/downloads)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/Jaiprasadpugazhendi/crmtool.git
cd crmtool
```

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory

```bash
cd backend
```

#### 2.2 Install Dependencies

```bash
npm install
```

#### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` directory (or rename the existing `.env` file):

```bash
# Copy the example below or modify the existing .env file
```

**`.env` file contents:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/salesai-crm
JWT_SECRET=your_jwt_super_secret_key_change_this_in_prod
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key_change_this_in_prod
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Important Configuration Notes:**

- **Local MongoDB**: If running MongoDB locally, use `mongodb://localhost:27017/salesai-crm`
- **MongoDB Atlas** (Cloud): Replace with your connection string:
  ```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/salesai-crm?retryWrites=true&w=majority
  ```
- **JWT Secrets**: Change these to strong, random strings in production
- **Frontend URL**: Update if your frontend runs on a different port

#### 2.4 Start MongoDB (if running locally)

**Windows:**
```bash
# Open a new terminal and run:
mongod
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

#### 2.5 Seed the Database (Optional but Recommended)

This creates initial users and sample data:

```bash
npm run seed
```

**Default Users Created:**
- **Admin**: `admin@salesai.com` / `password123`
- **Manager**: `manager@salesai.com` / `password123`
- **Agent**: `agent@salesai.com` / `password123`

#### 2.6 Start the Backend Server

```bash
npm run dev
```

The backend will start on **http://localhost:5000**

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### Step 3: Frontend Setup

#### 3.1 Open a New Terminal

Keep the backend running and open a new terminal window.

#### 3.2 Navigate to Project Root

```bash
cd d:/salesai-crm
# OR from backend directory:
cd ..
```

#### 3.3 Install Frontend Dependencies

```bash
npm install
```

#### 3.4 Configure Frontend Environment (if needed)

Create a `.env.local` file in the root directory if you need to configure API endpoints:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

#### 3.5 Start the Frontend

```bash
npm run dev
```

The frontend will start on **http://localhost:5173**

### Step 4: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/v1

## 🧪 Testing the API

### Using Postman

1. Import the `postman_collection.json` file from the `backend` directory
2. Set the environment variables:
   - `URL`: `http://localhost:5000`
   - `TOKEN`: (will be set after login)

### Example API Calls

#### Register a New User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@salesai.com",
  "password": "password123"
}
```

#### Get All Leads (Requires Authentication)
```bash
GET http://localhost:5000/api/v1/leads
Authorization: Bearer <your_token_here>
```

## 📁 Project Structure

```
salesai-crm/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Database & Logger config
│   │   ├── controllers/       # Request handlers
│   │   ├── middlewares/       # Auth, Validation, Error handling
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   ├── validations/       # Zod schemas
│   │   ├── scripts/           # Seed script
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Entry point
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── README.md
├── components/                 # React components
├── pages/                      # Page components
├── services/                   # API services
├── App.tsx                     # Main app component
├── index.tsx                   # Entry point
├── package.json
└── SETUP.md                    # This file
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   mongosh
   ```
2. Verify the `MONGO_URI` in your `.env` file
3. If using MongoDB Atlas, check your IP whitelist and credentials

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution:**
1. Change the port in `.env`:
   ```env
   PORT=5001
   ```
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### CORS Issues

**Error**: `Access to fetch at 'http://localhost:5000' has been blocked by CORS policy`

**Solution:**
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that CORS is properly configured in `backend/src/app.js`

### JWT Token Errors

**Error**: `JsonWebTokenError: invalid token`

**Solutions:**
1. Ensure you're sending the token in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```
2. Check that `JWT_SECRET` is set in `.env`
3. Token might be expired - login again to get a new token

## 🔐 Security Notes

### For Production Deployment:

1. **Change all secrets** in `.env`:
   ```env
   JWT_SECRET=<generate-a-strong-random-string>
   JWT_REFRESH_SECRET=<generate-another-strong-random-string>
   ```

2. **Use environment variables** - Never commit `.env` to Git

3. **Update CORS settings** to allow only your production frontend domain

4. **Use HTTPS** for all communications

5. **Set NODE_ENV to production**:
   ```env
   NODE_ENV=production
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)
- `POST /api/v1/auth/forgot-password` - Request password reset
- `PUT /api/v1/auth/reset-password/:resetToken` - Reset password
- `GET /api/v1/auth/logout` - Logout user

### Leads Endpoints

- `GET /api/v1/leads` - Get all leads (protected)
- `POST /api/v1/leads` - Create lead (protected)
- `GET /api/v1/leads/:id` - Get single lead (protected)
- `PUT /api/v1/leads/:id` - Update lead (protected)
- `DELETE /api/v1/leads/:id` - Delete lead (admin/manager only)
- `POST /api/v1/leads/:id/convert` - Convert lead to customer (protected)

### Customers Endpoints

- `GET /api/v1/customers` - Get all customers (protected)
- `POST /api/v1/customers` - Create customer (protected)
- `GET /api/v1/customers/:id` - Get single customer (protected)
- `PUT /api/v1/customers/:id` - Update customer (protected)
- `DELETE /api/v1/customers/:id` - Delete customer (admin/manager only)

### Deals Endpoints

- `GET /api/v1/deals` - Get all deals (protected)
- `POST /api/v1/deals` - Create deal (protected)
- `GET /api/v1/deals/:id` - Get single deal (protected)
- `PUT /api/v1/deals/:id` - Update deal (protected)
- `DELETE /api/v1/deals/:id` - Delete deal (admin/manager only)

### Tasks Endpoints

- `GET /api/v1/tasks` - Get all tasks (protected)
- `POST /api/v1/tasks` - Create task (protected)
- `GET /api/v1/tasks/:id` - Get single task (protected)
- `PUT /api/v1/tasks/:id` - Update task (protected)
- `DELETE /api/v1/tasks/:id` - Delete task (protected)

### Activity Logs Endpoints

- `GET /api/v1/logs` - Get activity logs (admin only)

## 🎯 Next Steps

1. **Customize the application** to fit your business needs
2. **Add more features** like email notifications, reports, etc.
3. **Deploy to production** (Render, Railway, AWS, etc.)
4. **Set up CI/CD** for automated deployments
5. **Add tests** for better code quality

## 📞 Support

For issues or questions:
- Check the `backend/README.md` for backend-specific documentation
- Review the API using the Postman collection
- Check MongoDB connection and logs

## 📝 License

This project is licensed under the MIT License.
