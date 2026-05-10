# AI-Based Resume Builder with QR Code

A modern, professional MERN stack application for creating AI-optimized resumes.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT.
- **Smart Editor**: Multi-step, tabbed interface to fill in your details easily.
- **AI Integration (Gemini)**: 
  - Automatically generate professional summaries based on your skills and experience.
  - Improve and optimize job descriptions to be ATS-friendly.
- **Live Preview**: See your resume update in real-time as you type.
- **QR Code Generation**: Automatically embeds a scannable QR code linking to your portfolio or LinkedIn.
- **PDF Export**: Download your final resume as a perfectly formatted, print-ready PDF.
- **Customization**: Change the primary color theme of your resume instantly.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React, react-to-print, qrcode.react
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, @google/genai

## 📁 Folder Structure

```
AI-Resume Builder/
├── backend/
│   ├── models/           # MongoDB schemas (User, Resume)
│   ├── routes/           # API endpoints (auth, resume, ai)
│   ├── middleware/       # Custom middleware (JWT auth)
│   ├── .env              # Environment variables
│   └── server.js         # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # ResumeForm, ResumePreview, ProtectedRoute
│   │   ├── context/      # AuthContext
│   │   ├── pages/        # Home, Login, Register, Dashboard, Editor
│   │   ├── App.jsx       # App routing
│   │   ├── main.jsx      # React entry
│   │   └── index.css     # Tailwind imports and custom classes
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI)
- Google Gemini API Key

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` with your `GEMINI_API_KEY`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/resume-builder
   JWT_SECRET=super_secret_jwt_key_123
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

# 👋 Hello, I'm Tushar Gupta

💻 Full Stack Developer  
🚀 Passionate about C,C++,Java,C#,React & AI
## 🌐 Socials:

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/tushargupta333)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)

# 💻 Tech Stack:

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

# 📊 GitHub Stats:

![](https://github-readme-stats.vercel.app/api?username=GUPTA33E&theme=radical&hide_border=false&include_all_commits=true&count_private=true)

![](https://nirzak-streak-stats.vercel.app/?user=GUPTA33E&theme=radical&hide_border=false)

![](https://github-readme-stats.vercel.app/api/top-langs/?username=GUPTA33E&theme=radical&hide_border=false&layout=compact)

## 🏆 GitHub Trophies

![](https://github-profile-trophy.vercel.app/?username=GUPTA33E&theme=radical&no-frame=false&no-bg=false&margin-w=4)

AI Resume Checker is a smart web application that analyzes resumes using Artificial Intelligence and provides instant feedback to improve resume quality. The system checks important sections like skills, education, experience, projects, formatting, keywords, and ATS compatibility.

It helps students and job seekers create professional resumes that match industry standards and increase their chances of selection in interviews.
