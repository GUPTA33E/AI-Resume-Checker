const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// Create or update a resume
router.post('/', auth, async (req, res) => {
  try {
    const { id, ...resumeData } = req.body;
    
    if (id) {
      let resume = await Resume.findById(id);
      if (resume && resume.userId.toString() === req.user.id) {
        resumeData.updatedAt = Date.now();
        resume = await Resume.findByIdAndUpdate(id, { $set: resumeData }, { new: true });
        return res.json(resume);
      }
    }

    const newResume = new Resume({
      ...resumeData,
      userId: req.user.id
    });
    
    const savedResume = await newResume.save();
    res.json(savedResume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all resumes for user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get specific resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });
    
    // We allow public viewing of a resume for the QR code feature, 
    // but maybe we can just return it. 
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });
    
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Resume not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
