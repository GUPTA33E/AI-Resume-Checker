import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Wand2, QrCode, Download } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-primary-500 selection:text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-500 bg-clip-text text-transparent">
          ResumeAI
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link to="/register" className="bg-primary-600 hover:bg-primary-500 px-5 py-2 rounded-full font-medium transition shadow-lg shadow-primary-500/30">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Build a Professional Resume <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-500">
            Powered by AI
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 mb-10 max-w-2xl"
        >
          Create ATS-friendly resumes in minutes. Let our AI generate perfect summaries and bullet points. Download as PDF and share with a unique QR code.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/register" className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2">
            <Wand2 size={20} />
            Create Your Resume Now
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 text-left">
          <FeatureCard 
            icon={<Wand2 className="text-purple-400" size={32} />}
            title="AI-Powered Writing"
            desc="Stuck on what to write? Our AI generates professional summaries and role descriptions based on your skills."
          />
          <FeatureCard 
            icon={<QrCode className="text-primary-400" size={32} />}
            title="Smart QR Integration"
            desc="Automatically generate a QR code linking to your portfolio or LinkedIn profile right on your resume."
          />
          <FeatureCard 
            icon={<Download className="text-emerald-400" size={32} />}
            title="Export to PDF"
            desc="Download your pixel-perfect, ATS-friendly resume as a PDF file, ready to send to recruiters."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm"
  >
    <div className="mb-4 bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;
