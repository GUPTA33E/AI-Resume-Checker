import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, FileText, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resume', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNew = () => {
    navigate('/editor');
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
          ResumeAI
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium hidden md:block">Welcome, {user?.name}</span>
          <button 
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
            <p className="text-gray-500">Manage and edit your professional resumes</p>
          </div>
          <button 
            onClick={createNew}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg shadow-primary-500/30 flex items-center gap-2"
          >
            <Plus size={20} />
            Create New
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">Create your first professional resume in minutes using our AI-powered builder.</p>
            <button 
              onClick={createNew}
              className="text-primary-600 font-semibold hover:underline"
            >
              Start Building Now &rarr;
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resumes.map(resume => (
              <motion.div 
                key={resume._id}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group"
              >
                <div className="h-40 bg-slate-100 border-b border-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                  {/* Miniature preview could go here */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/5 backdrop-blur-[2px] transition-all duration-300">
                    <button 
                      onClick={() => navigate(`/editor/${resume._id}`)}
                      className="bg-white text-gray-900 shadow-lg px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition"
                    >
                      <Edit size={16} /> Edit
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 truncate mb-1" title={resume.title}>{resume.title || 'Untitled'}</h3>
                  <p className="text-xs text-gray-500 mb-4">Last updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
                  
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                    <button 
                      onClick={() => navigate(`/editor/${resume._id}`)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Open
                    </button>
                    <button 
                      onClick={() => deleteResume(resume._id)}
                      className="text-gray-400 hover:text-red-500 transition p-1"
                      title="Delete Resume"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
