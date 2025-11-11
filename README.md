# 🧩 MiniLinked — A LinkedIn Clone

MiniLinked is a full-stack social platform that lets users **sign up, log in, create posts, edit, delete, and like posts** — similar to a simplified version of LinkedIn’s feed system.

It is built using the **MERN (MongoDB, Express, React, Node.js)** stack and deployed using **Render** (for backend) and **Netlify** (for frontend).

---

## 🚀 Live Demo
🌐 **Frontend:** [MiniLinked Frontend](https://minilinked-in.netlify.app)
🖥️ **Backend API:** [MiniLinked API](https://linkedin-clone-pnrd.onrender.com)

---

## 🧠 Tech Stack

### 🖥️ Frontend
- **React.js (Vite)** — Fast and modern React framework  
- **Axios** — For API requests  
- **React Router DOM** — For routing and protected navigation  
- **Custom CSS** — Clean, minimal, LinkedIn-inspired UI  

### ⚙️ Backend
- **Node.js & Express.js** — RESTful API  
- **MongoDB Atlas** — Cloud-based NoSQL database  
- **Mongoose** — ODM for schema modeling  
- **bcryptjs** — Secure password hashing  
- **jsonwebtoken (JWT)** — Authentication system  
- **dotenv** — Manages environment variables  
- **cors** — Allows frontend–backend communication  

### ☁️ Deployment
- **Render** → Backend hosting  
- **Netlify** → Frontend hosting  
- **MongoDB Atlas** → Cloud database

---

## 💡 Features

| Feature | Description |
|----------|-------------|
| 👤 **User Authentication** | Secure signup & login using JWT |
| 🧾 **Post Creation** | Users can create text-based posts |
| ✏️ **Edit & Delete** | Authenticated users can edit/delete their own posts |
| ❤️ **Like System** | Users can like/unlike posts |
| 🧍‍♂️ **User Profile Page** | Displays user info & their personal posts |
| 🧭 **Feed Page** | Shows all users’ posts with author and timestamps |
| 🌗 **Responsive Design** | Fully responsive UI for mobile and desktop |
| 🔒 **Protected Routes** | Auth required for post actions |

---

## 🧰 How to Run the Project

### 🪄 Clone Repository
```bash
git clone https://github.com/ashutoshm2004/linkedin-clone.git
cd linkedin-clone
```

---

### ⚙️ 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

Then run:
```bash
npm run dev
```

> Backend will start on **http://localhost:5000**

---

### 🖥️ 2. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:
```bash
VITE_API_URL=http://localhost:5000/api
```

Then start the frontend:
```bash
npm run dev
```

> Frontend will start on **http://localhost:5173**

---

### 🧩 3. Run the Full App Locally
1. Start **MongoDB** (local or Atlas connection)
2. Start the **backend** using `npm run dev`
3. Start the **frontend** using `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

Now you can:
- Sign up a user  
- Log in  
- Create, edit, delete, and like posts  
- Visit your profile page  

---

## ☁️ Deployment Guide

### 🌐 Deploy Backend on Render
1. Push your code to GitHub  
2. Go to [Render](https://render.com) → click **New Web Service**  
3. Select your GitHub repo → set **Root Directory** = `backend/`  
4. Add build and start commands:
   ```
   Build Command: npm install
   Start Command: npm start
   ```
5. Add Environment Variables:
   ```
   MONGO_URI=<your Atlas URI>
   JWT_SECRET=<your secret>
   PORT=10000
   ```
6. Click **Deploy**  
7. Copy your Render backend URL (e.g. `https://linkedin-clone-backend.onrender.com`)

---

### 💻 Deploy Frontend on Netlify
1. Go to [Netlify](https://app.netlify.com) → “New site from Git”  
2. Connect your GitHub repo  
3. Configure build:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: dist
   ```
4. Add Environment Variable:
   ```
   VITE_API_URL=https://linkedin-clone-backend.onrender.com/api
   ```
5. Deploy → Netlify provides a live URL (e.g. `https://minilinked.netlify.app`)

---

## 🧩 Folder Structure

```
linkedin-clone/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── .env (not committed)
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env (not committed)
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🧠 Future Improvements
- 🖼️ Image uploads in posts  
- 💬 Comments and replies  
- 👤 Profile avatars and bios  
- 🌙 Dark/Light mode toggle  
- 🔔 Real-time notifications (Socket.io)

---

## 👨‍💻 Author
**Ashutosh Mishra**  
📧 [ashutm59@gmail.com](ashutm59@gmail.com)
🌐 GitHub: [https://github.com/ashutoshm2004](https://github.com/ashutoshm2004)

---

## ⚡ Quick Reference

| Task | Command |
|------|----------|
| Clone Repo | `git clone <repo-url>` |
| Run Backend | `cd backend && npm install && npm run dev` |
| Run Frontend | `cd frontend && npm install && npm run dev` |
| Build Frontend | `npm run build` |
| Deploy Backend | Render |
| Deploy Frontend | Netlify |

---
