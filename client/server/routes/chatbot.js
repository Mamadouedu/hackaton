const express = require('express');
const { OpenAI } = require('openai');

const router = express.Router();
const openai = new OpenAI(process.env.OPENAI_KEY);

router.post('/', async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: "Le message est requis" });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: req.body.message }],
      model: "gpt-3.5-turbo",
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ 
      error: error.message || "Erreur du serveur" 
    });
  }
});

module.exports = router;