const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Resume' },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String,
    current: Boolean
  }],
  skills: [String],
  projects: [{
    title: String,
    link: String,
    description: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String
  }],
  themeColor: { type: String, default: '#3b82f6' },
  templateId: { type: String, default: 'modern' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
