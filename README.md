🚀 TRAINISTRY
Trainer–Company Collaboration Platform

TRAINISTRY is a full-stack MERN application that connects Companies and Trainers/Freelancers through a structured project marketplace with role-based dashboards, application tracking, and interview scheduling.

🏗️ Project Architecture

Frontend: React.js

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT (Role-based Access Control)

Architecture Pattern: MVC + Service Layer

📁 Project Structure
TRAINISTRY/
📦 1. Client (Frontend – React)
client/

This folder contains the complete React frontend application.

📂 src/

Main application source code.

🧩 components/

Reusable UI components organized by role.

admin/ → Admin specific components

company/ → Company dashboard components (Project list, Notifications, Post form)

trainer/ → Trainer-specific UI components

common/ → Shared UI components (Navbar, Buttons, etc.)

📄 pages/

Page-level components mapped to routes.

👑 admin/

Dashboard

Manage Projects

Reports

Manage Users

🔐 auth/

Login

Register

Company Register

Trainer Register

Forgot Password

Account Type Selection

🏢 company/

CompanyDashboard

PostProject

Applications

Shortlisted

ScheduleInterview

🎓 trainer/

Dashboard

Projects (View available projects)

Applications (Track applied projects)

Profile

ResumeUpload

🌍 LandingPage.js

Public homepage of the platform.

🧠 context/

AuthContext.js
Handles global authentication state using React Context API.

🪝 hooks/

Custom React hooks (if any).

🧭 routes/

AppRoutes.js
Defines all frontend routes and protected routes.

🔌 services/

API communication layer.

api.js → Axios base configuration

authService.js → Auth APIs

companyService.js → Company APIs

trainerService.js → Trainer APIs

adminService.js → Admin APIs

notificationService.js → Notification APIs

🎨 styles/

CSS files categorized by feature:

auth.css

dashboard.css

companyDashboard.css

forms.css

navbar.css

global.css

LandingPage.css

🧱 Layouts

MainLayout.js → Public layout

DashboardLayout.js → Role-based dashboard layout

📦 2. Server (Backend – Express + MongoDB)
server/

Backend REST API built using Express and MongoDB.

📂 src/

Core backend source code.

⚙️ config/

db.js → MongoDB connection

env.js → Environment configuration

📌 constants/

roles.js → Defines user roles (Admin, Company, Trainer)

🎮 controllers/

Business logic layer.

authController.js

adminController.js

companyController.js

notificationController.js

Controllers handle incoming requests and return responses.

🛡 middleware/

Custom middleware functions:

authMiddleware.js → JWT authentication

roleMiddleware.js → Role-based access control

errorMiddleware.js → Centralized error handling

🗃 models/

MongoDB Mongoose schemas:

User

CompanyProfile

TrainerProfile

Project

Application

Notification

🛣 routes/

API route definitions:

authRoutes.js

adminRoutes.js

companyRoutes.js

trainerRoutes.js

notificationRoutes.js

Routes connect endpoints to controllers.

🔧 services/

Utility services:

emailService.js → Email notifications

notificationService.js → Notification logic

🚀 server.js

Entry point of backend server.

📚 3. Docs
docs/

Contains technical documentation:

Problem Statement

Solution Approach

System Architecture

ER Diagram

API Documentation

Module Responsibilities

UI Design Guidelines

🔐 Key Features

✅ Role-based authentication (Admin / Company / Trainer)
✅ JWT-based protected routes
✅ Project posting and application flow
✅ Application tracking & shortlisting
✅ Interview scheduling
✅ Notification system
✅ Resume upload support
✅ Clean MVC architecture
✅ Service-based API abstraction

🧠 Architectural Pattern

The project follows:

MVC (Model–View–Controller)

Service Layer Pattern

Role-Based Access Control (RBAC)

Separation of Concerns

Modular Folder Structure

🚀 Future Enhancements

Real-time notifications (Socket.io)

Payment gateway integration

AI-based trainer recommendation

Resume parsing & scoring

Admin analytics dashboard