import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const ResumePreview = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, experience, education, skills, projects, themeColor } = resumeData;
  
  // Decide which URL to use for the QR code
  const qrUrl = personalInfo.portfolioUrl || personalInfo.linkedinUrl || personalInfo.githubUrl || `http://localhost:5173/resume/${resumeData._id}`;

  return (
    <div ref={ref} className="p-10 font-sans text-gray-800 h-full bg-white print:p-8">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 pb-6 mb-6" style={{ borderColor: themeColor }}>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight" style={{ color: themeColor }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail size={14} style={{ color: themeColor }} /> <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={14} style={{ color: themeColor }} /> <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: themeColor }} /> <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.portfolioUrl && (
              <div className="flex items-center gap-1.5">
                <Globe size={14} style={{ color: themeColor }} /> 
                <a href={personalInfo.portfolioUrl} className="hover:underline">{personalInfo.portfolioUrl.replace(/^https?:\/\//, '')}</a>
              </div>
            )}
            {personalInfo.linkedinUrl && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={14} style={{ color: themeColor }} /> 
                <a href={personalInfo.linkedinUrl} className="hover:underline">LinkedIn</a>
              </div>
            )}
            {personalInfo.githubUrl && (
              <div className="flex items-center gap-1.5">
                <Github size={14} style={{ color: themeColor }} /> 
                <a href={personalInfo.githubUrl} className="hover:underline">GitHub</a>
              </div>
            )}
          </div>
        </div>
        
        {/* QR Code */}
        {qrUrl && (
          <div className="flex flex-col items-center ml-4 shrink-0">
            <div className="bg-white p-1.5 border rounded-lg shadow-sm">
              <QRCodeSVG value={qrUrl} size={70} />
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Scan Me</span>
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm font-medium text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: themeColor }}>{exp.company}</div>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description.split('\n').map((line, i) => (
                      <span key={i} className="block mb-1">• {line.replace(/^[•\-\*]\s*/, '')}</span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-xs hover:underline" style={{ color: themeColor }}>
                      {proj.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <div className="text-sm font-medium mb-1" style={{ color: themeColor }}>{edu.institution}</div>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: `${themeColor}40` }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ResumePreview;
