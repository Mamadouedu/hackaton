// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import du SDK OpenAI
const OpenAI = require('openai').default || require('openai');

const app = express();

// CORS : autoriser l'origine de votre front (adapter si différent)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Instanciation du client OpenAI avec la clé et le modèle configurables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

// Route POST /chat
app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Paramètre "question" manquant ou invalide.' });
    }

    // Appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'user', content: question }
      ]
    });

    const answer = completion.choices?.[0]?.message?.content;
    if (!answer) {
      return res.status(500).json({ error: "Réponse vide de l'API OpenAI." });
    }

    // Renvoi de la réponse
    res.json({ answer });

  } catch (err) {
    console.error('Erreur OpenAI:', err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
