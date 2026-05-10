const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/generate-summary', auth, async (req, res) => {
  try {
    const { skills, experience, title } = req.body;
    
    const prompt = `Write a professional resume summary for a ${title || 'Professional'} with the following skills: ${skills.join(', ')}. And experience: ${experience.map(e => e.position + ' at ' + e.company).join(', ')}. Keep it concise, professional, and ATS-friendly. Under 4 sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

router.post('/improve-description', auth, async (req, res) => {
  try {
    const { description, type } = req.body; // type can be 'experience' or 'project'
    
    const prompt = `Improve the following ${type} description for a resume. Make it more professional, action-oriented, and ATS-friendly. Use strong action verbs and highlight achievements. Keep it as bullet points.\n\nOriginal: ${description}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = router;
