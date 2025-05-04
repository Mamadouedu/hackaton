require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openai.js');

const app = express();

// Configuration CORS pour autoriser uniquement votre frontend
app.use(cors({ 
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes OpenAI
app.use('/api/openai', openaiRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Clé API chargée: ${process.env.OPENAI_API_KEY ? 'Oui' : 'Non'}`);
});