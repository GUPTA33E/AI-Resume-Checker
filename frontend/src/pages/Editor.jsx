import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeft, Save, Download, DownloadCloud, Check } from 'lucide-react';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const initialData = {
  title: 'My Professional Resume',
  personalInfo: {
    fullName: '', email: '', phone: '', address: '', 
    portfolioUrl: '', linkedinUrl: '', githubUrl: '', summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  themeColor: '#3b82f6'
};

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const componentRef = useRef();

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.data) setResumeData(res.data);
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:5000/api/resume', resumeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResumeData(res.data);
      if (!id) {
        navigate(`/editor/${res.data._id}`, { replace: true });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}_CV`,
  });

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Editor Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition">
            <ArrowLeft size={20} />
          </Link>
          <input 
            type="text" 
            value={resumeData.title}
            onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
            className="text-lg font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 outline-none transition px-1 py-1"
            placeholder="Resume Title"
          />
        </div>
        <div className="flex gap-3">
          <button 
            onClick={saveResume}
            disabled={saving}
            className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
              saved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {saving ? <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" /> : 
             saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'Saved!' : 'Save'}
          </button>
          <button 
            onClick={handlePrint}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium shadow-md shadow-primary-500/20 flex items-center gap-2 transition"
          >
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </header>

      {/* Editor Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column - Form */}
        <div className="w-1/2 h-full overflow-y-auto bg-white border-r border-gray-200">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* Right Column - Preview */}
        <div className="w-1/2 h-full overflow-y-auto bg-slate-100 p-8 flex justify-center custom-scrollbar">
          <div className="bg-white shadow-xl max-w-[210mm] w-full min-h-[297mm] transition-all">
            <ResumePreview ref={componentRef} resumeData={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
