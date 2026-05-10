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

## 📸 Screenshots

*(Add your screenshots here)*
- `landing-page.png`
- `dashboard.png`
- `resume-editor.png`
- `pdf-export.png`
