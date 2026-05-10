import React, { useState } from 'react';
import axios from 'axios';
import { Wand2, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [generating, setGenerating] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'theme', label: 'Theme' }
  ];

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...resumeData[arrayName]];
    newArray[index][field] = value;
    setResumeData({ ...resumeData, [arrayName]: newArray });
  };

  const addItem = (arrayName, defaultItem) => {
    setResumeData({
      ...resumeData,
      [arrayName]: [...resumeData[arrayName], defaultItem]
    });
  };

  const removeItem = (arrayName, index) => {
    const newArray = [...resumeData[arrayName]];
    newArray.splice(index, 1);
    setResumeData({ ...resumeData, [arrayName]: newArray });
  };

  const generateAISummary = async () => {
    setGenerating('summary');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate-summary', {
        title: resumeData.title,
        skills: resumeData.skills,
        experience: resumeData.experience
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      updatePersonalInfo('summary', res.data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const improveDescription = async (index, type) => {
    setGenerating(`desc-${index}`);
    const originalText = type === 'experience' 
      ? resumeData.experience[index].description 
      : resumeData.projects[index].description;
      
    try {
      const res = await axios.post('http://localhost:5000/api/ai/improve-description', {
        description: originalText,
        type
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      handleArrayChange(type, index, 'description', res.data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 shrink-0 custom-scrollbar bg-slate-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'border-primary-600 text-primary-700 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Personal Details Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="input-field" value={resumeData.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="input-field" value={resumeData.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="input-field" value={resumeData.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="input-field" value={resumeData.personalInfo.address} onChange={e => updatePersonalInfo('address', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
                <input type="url" className="input-field" value={resumeData.personalInfo.portfolioUrl} onChange={e => updatePersonalInfo('portfolioUrl', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input type="url" className="input-field" value={resumeData.personalInfo.linkedinUrl} onChange={e => updatePersonalInfo('linkedinUrl', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input type="url" className="input-field" value={resumeData.personalInfo.githubUrl} onChange={e => updatePersonalInfo('githubUrl', e.target.value)} />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                <button 
                  onClick={generateAISummary}
                  disabled={generating === 'summary'}
                  className="text-xs flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition font-medium"
                >
                  <Wand2 size={12} />
                  {generating === 'summary' ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea 
                className="input-field min-h-[120px] resize-y" 
                value={resumeData.personalInfo.summary} 
                onChange={e => updatePersonalInfo('summary', e.target.value)}
                placeholder="Write a brief summary of your professional background..."
              />
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative group">
                <button 
                  onClick={() => removeItem('experience', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Job Title</label>
                    <input type="text" className="input-field" value={exp.position} onChange={e => handleArrayChange('experience', index, 'position', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Company</label>
                    <input type="text" className="input-field" value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Start Date</label>
                    <input type="text" className="input-field" placeholder="MM/YYYY" value={exp.startDate} onChange={e => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">End Date</label>
                    <input type="text" className="input-field" placeholder="MM/YYYY or Present" value={exp.endDate} onChange={e => handleArrayChange('experience', index, 'endDate', e.target.value)} disabled={exp.current} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
                    <button 
                      onClick={() => improveDescription(index, 'experience')}
                      disabled={generating === `desc-${index}`}
                      className="text-xs flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition font-medium"
                    >
                      <Wand2 size={12} />
                      {generating === `desc-${index}` ? 'Improving...' : 'AI Improve'}
                    </button>
                  </div>
                  <textarea 
                    className="input-field min-h-[100px]" 
                    value={exp.description} 
                    onChange={e => handleArrayChange('experience', index, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('experience', { position: '', company: '', startDate: '', endDate: '', description: '', current: false })}
              className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Experience
            </button>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative group">
                <button 
                  onClick={() => removeItem('education', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4 pr-8">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Institution</label>
                    <input type="text" className="input-field" value={edu.institution} onChange={e => handleArrayChange('education', index, 'institution', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Degree</label>
                    <input type="text" className="input-field" value={edu.degree} onChange={e => handleArrayChange('education', index, 'degree', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Field of Study</label>
                    <input type="text" className="input-field" value={edu.fieldOfStudy} onChange={e => handleArrayChange('education', index, 'fieldOfStudy', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Start Date</label>
                    <input type="text" className="input-field" placeholder="YYYY" value={edu.startDate} onChange={e => handleArrayChange('education', index, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">End Date</label>
                    <input type="text" className="input-field" placeholder="YYYY" value={edu.endDate} onChange={e => handleArrayChange('education', index, 'endDate', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('education', { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })}
              className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Education
            </button>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {resumeData.projects.map((proj, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-xl relative group">
                <button 
                  onClick={() => removeItem('projects', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Project Title</label>
                    <input type="text" className="input-field" value={proj.title} onChange={e => handleArrayChange('projects', index, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Link</label>
                    <input type="url" className="input-field" value={proj.link} onChange={e => handleArrayChange('projects', index, 'link', e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</label>
                    <button 
                      onClick={() => improveDescription(index, 'projects')}
                      disabled={generating === `desc-${index}`}
                      className="text-xs flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition font-medium"
                    >
                      <Wand2 size={12} />
                      {generating === `desc-${index}` ? 'Improving...' : 'AI Improve'}
                    </button>
                  </div>
                  <textarea 
                    className="input-field min-h-[80px]" 
                    value={proj.description} 
                    onChange={e => handleArrayChange('projects', index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={() => addItem('projects', { title: '', link: '', description: '' })}
              className="w-full py-3 border-2 border-dashed border-primary-300 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Project
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100">
              Enter skills separated by commas (e.g. React, Node.js, Python)
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Skills</label>
              <textarea 
                className="input-field min-h-[150px]" 
                value={resumeData.skills.join(', ')} 
                onChange={e => setResumeData({...resumeData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                placeholder="React, JavaScript, Project Management..."
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Currently added skills:</h4>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-gray-200">
                    {skill}
                    <button 
                      onClick={() => {
                        const newSkills = [...resumeData.skills];
                        newSkills.splice(index, 1);
                        setResumeData({...resumeData, skills: newSkills});
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color</label>
              <div className="flex gap-4">
                {['#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#0f172a'].map(color => (
                  <button
                    key={color}
                    onClick={() => setResumeData({...resumeData, themeColor: color})}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-transform ${resumeData.themeColor === color ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className="relative">
                  <input 
                    type="color" 
                    value={resumeData.themeColor} 
                    onChange={e => setResumeData({...resumeData, themeColor: e.target.value})}
                    className="w-10 h-10 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                  />
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-gradient-to-br from-white to-gray-200 shadow-sm">
                    <Plus size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeForm;
