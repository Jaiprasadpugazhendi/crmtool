# 🚀 SalesAI CRM

<div align="center">

![SalesAI CRM](https://img.shields.io/badge/SalesAI-CRM-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**A modern, production-ready Customer Relationship Management system with AI-powered features**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 📖 Overview

SalesAI CRM is a comprehensive customer relationship management platform designed to streamline sales processes, manage leads and customers, track deals, and automate workflows. Built with modern technologies and best practices, it offers a scalable, secure, and user-friendly solution for businesses of all sizes.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 🤖 **AI-Powered** - Integrated AI assistant for email generation and insights
- 📊 **Complete CRM Workflow** - Lead management, customer tracking, deal pipeline, and task management
- 🎨 **Modern UI** - Beautiful, responsive interface built with React and TypeScript
- 🔒 **Production-Ready** - Security best practices, input validation, and error handling
- 📱 **RESTful API** - Well-documented API with Postman collection included
- 🚀 **Easy Deployment** - Ready for deployment on cloud platforms

---

## 🎯 Features

### Core CRM Features

#### 👥 Lead Management
- Create, update, and track leads
- Assign leads to team members
- Lead source tracking (Website, Referral, LinkedIn, etc.)
- Lead status management (New, Contacted, Qualified, Lost, Converted)
- Convert leads to customers with one click
- Soft delete functionality

#### 🏢 Customer Management
- Comprehensive customer profiles
- Contact history and notes
- Tag-based organization
- Customer assignment to sales reps
- Address and company information

#### 💼 Deal Pipeline
- Visual deal tracking
- Multiple deal stages (Proposal, Negotiation, Closed-Won, Closed-Lost)
- Deal value and probability tracking
- Closing date management
- Deal assignment and ownership

#### ✅ Task Management
- Create and assign tasks
- Priority levels (Low, Medium, High)
- Due date tracking
- Task status (Pending, In-Progress, Completed)
- Link tasks to leads, customers, or deals
- Task filtering by role

#### 📝 Activity Logging
- Automatic activity tracking
- User action history
- Login tracking
- Entity change logs
- Detailed activity reports (Admin only)

### Authentication & Security

- 🔑 User registration and login
- 🎫 JWT access tokens with configurable expiration
- 🔄 Refresh token support
- 🔐 Password hashing with bcrypt
- 🛡️ Role-based access control (Admin, Manager, Agent)
- 📧 Password reset via email (token-based)
- ✉️ Email verification support
- 🚫 Rate limiting to prevent abuse
- 🔒 Helmet.js for security headers
- ✅ Input validation with Zod

### AI Features

- 🤖 AI Assistant for sales insights
- ✉️ AI-powered email generation
- 📊 Intelligent data analysis
- 💡 Smart recommendations

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Zod** | Schema validation |
| **Winston** | Logging |
| **Helmet** | Security headers |
| **CORS** | Cross-origin resource sharing |
| **Morgan** | HTTP request logger |
| **express-rate-limit** | Rate limiting |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool and dev server |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |
| **Google Generative AI** | AI integration |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jaiprasadpugazhendi/crmtool.git
   cd crmtool
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   # Edit the .env file with your settings
   
   # Seed the database (creates default users)
   npm run seed
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # In a new terminal, from the project root
   npm install
   
   # Start the frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/v1

### Default Credentials

After seeding the database, you can login with:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@salesai.com | password123 |
| Manager | manager@salesai.com | password123 |
| Agent | agent@salesai.com | password123 |

> ⚠️ **Important**: Change these credentials in production!

---

## 📚 Documentation

### Detailed Setup Guide

For comprehensive setup instructions, troubleshooting, and configuration details, see:
- **[SETUP.md](./SETUP.md)** - Complete installation and configuration guide

### Backend Documentation

For backend-specific documentation, API details, and architecture:
- **[backend/README.md](./backend/README.md)** - Backend documentation

### API Documentation

#### Base URL
```
http://localhost:5000/api/v1
```

#### Authentication Endpoints

```http
POST   /auth/register              # Register new user
POST   /auth/login                 # Login user
GET    /auth/me                    # Get current user (protected)
POST   /auth/forgot-password       # Request password reset
PUT    /auth/reset-password/:token # Reset password
GET    /auth/logout                # Logout user
```

#### Lead Endpoints

```http
GET    /leads                      # Get all leads (protected)
POST   /leads                      # Create lead (protected)
GET    /leads/:id                  # Get single lead (protected)
PUT    /leads/:id                  # Update lead (protected)
DELETE /leads/:id                  # Delete lead (admin/manager)
POST   /leads/:id/convert          # Convert to customer (protected)
```

#### Customer Endpoints

```http
GET    /customers                  # Get all customers (protected)
POST   /customers                  # Create customer (protected)
GET    /customers/:id              # Get single customer (protected)
PUT    /customers/:id              # Update customer (protected)
DELETE /customers/:id              # Delete customer (admin/manager)
```

#### Deal Endpoints

```http
GET    /deals                      # Get all deals (protected)
POST   /deals                      # Create deal (protected)
GET    /deals/:id                  # Get single deal (protected)
PUT    /deals/:id                  # Update deal (protected)
DELETE /deals/:id                  # Delete deal (admin/manager)
```

#### Task Endpoints

```http
GET    /tasks                      # Get all tasks (protected)
POST   /tasks                      # Create task (protected)
GET    /tasks/:id                  # Get single task (protected)
PUT    /tasks/:id                  # Update task (protected)
DELETE /tasks/:id                  # Delete task (protected)
```

#### Activity Log Endpoints

```http
GET    /logs                       # Get activity logs (admin only)
```

### Postman Collection

Import the `backend/postman_collection.json` file into Postman to test all API endpoints.

---

## 🏗️ Project Structure

```
salesai-crm/
├── backend/                      # Backend API
│   ├── src/
│   │   ├── config/              # Database & Logger configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── middlewares/         # Auth, Validation, Error handling
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic layer
│   │   ├── utils/               # Helper functions
│   │   ├── validations/         # Zod validation schemas
│   │   ├── scripts/             # Database seed script
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Entry point
│   ├── logs/                    # Application logs
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── postman_collection.json  # API testing collection
│   └── README.md
├── components/                   # React components
│   ├── Header.tsx
│   └── Sidebar.tsx
├── pages/                        # Page components
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── Leads.tsx
│   ├── LeadDetail.tsx
│   ├── Deals.tsx
│   ├── Tasks.tsx
│   ├── AIAssistant.tsx
│   └── AIEmailGen.tsx
├── services/                     # Frontend services
│   └── gemini.ts                # AI service
├── App.tsx                       # Main app component
├── index.tsx                     # Entry point
├── types.ts                      # TypeScript types
├── mockData.ts                   # Sample data
├── index.html
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── package.json
├── SETUP.md                      # Setup guide
└── README.md                     # This file
```

---

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Lead Management
![Leads](https://via.placeholder.com/800x400?text=Lead+Management+Screenshot)

### Deal Pipeline
![Deals](https://via.placeholder.com/800x400?text=Deal+Pipeline+Screenshot)

### AI Assistant
![AI Assistant](https://via.placeholder.com/800x400?text=AI+Assistant+Screenshot)

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control (RBAC)
- ✅ Input validation on all endpoints
- ✅ Rate limiting (100 requests per 10 minutes)
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Secure password reset flow
- ✅ SQL injection prevention (NoSQL)
- ✅ XSS protection

---

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to:
- **Render** - [Guide](https://render.com/docs/deploy-node-express-app)
- **Railway** - [Guide](https://docs.railway.app/deploy/deployments)
- **Heroku** - [Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- **AWS EC2** - [Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
- **DigitalOcean** - [Guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)

### Frontend Deployment

The frontend can be deployed to:
- **Vercel** - [Guide](https://vercel.com/docs)
- **Netlify** - [Guide](https://docs.netlify.com/)
- **GitHub Pages** - [Guide](https://pages.github.com/)
- **AWS S3 + CloudFront** - [Guide](https://aws.amazon.com/getting-started/hands-on/host-static-website/)

### Environment Variables for Production

Ensure you set these in your deployment platform:

```env
# Backend
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<strong-random-secret>
JWT_REFRESH_SECRET=<strong-random-secret>
NODE_ENV=production
FRONTEND_URL=<your-frontend-url>

# Frontend
VITE_API_URL=<your-backend-api-url>
```

---

## 🧪 Testing

### API Testing with Postman

1. Import `backend/postman_collection.json`
2. Set environment variables:
   - `URL`: `http://localhost:5000`
   - `TOKEN`: (auto-set after login)
3. Run the collection

### Manual Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jaiprasad Pugazhendi**

- GitHub: [@Jaiprasadpugazhendi](https://github.com/Jaiprasadpugazhendi)
- Repository: [crmtool](https://github.com/Jaiprasadpugazhendi/crmtool)

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by industry-leading CRM solutions
- AI integration powered by Google Generative AI
- Icons by [Lucide](https://lucide.dev/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [SETUP.md](./SETUP.md) guide
2. Review the [backend/README.md](./backend/README.md)
3. Open an issue on GitHub
4. Check existing issues for solutions

---

## 🗺️ Roadmap

### Planned Features

- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] File attachments
- [ ] Advanced search and filtering
- [ ] Export to CSV/PDF
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Two-factor authentication (2FA)
- [ ] Integration with third-party services (Slack, Zapier, etc.)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Jaiprasad Pugazhendi

</div>
