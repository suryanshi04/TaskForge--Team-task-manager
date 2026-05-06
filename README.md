TaskForge – Team Task Management System

TaskForge is a full-stack MERN application designed to help teams manage projects, assign tasks, track progress, and collaborate efficiently in one centralized dashboard.

Built with a modern responsive UI, JWT authentication, role-based access control, and MongoDB cloud storage.
## Project live link- https://blissful-fascination-production-110c.up.railway.app/
## Demo video- https://drive.google.com/file/d/1GJ2JL4FZaU7oTy-4G6YBxdsnGsuy8ABJ/view?usp=sharing

## Features-

## Authentication
- User Signup & Login
- JWT-based Authentication
- Protected Routes 
- Secure Password Hashing using bcrypt

##  Role-Based Access
###  Member
- View assigned tasks
- Update task status
- Track deadlines

###  Admin
- Create projects
- Create tasks
- Assign users
- Manage team members
- Change user roles

---

##  Task Management
- Create and assign tasks
- Task status tracking:
  - Todo
  - In Progress
  - Done
- Due date management
- Overdue task highlighting

---

## Project Management
- Create projects
- Organize tasks by projects
- Team collaboration support

---

## Dashboard
- Total tasks overview
- Completed tasks analytics
- Overdue tasks tracking
- Clean responsive UI

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- JWT Decode

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment
- Railway

---

# 📂 Project Structure

```bash
TaskForge/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
