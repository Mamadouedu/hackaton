const express = require('express');
const OpenAI = require('openai');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const router = express.Router();

// Configuration OpenAI avec vérification de la clé
if (!process.env.OPENAI_API_KEY) {
  console.error('ERREUR: OPENAI_API_KEY non définie');
  process.exit(1);
}

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000 // 30 secondes timeout
});

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Middleware de vérification d'API Key
router.use((req, res, next) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Configuration serveur invalide' });
  }
  next();
});

// Génération de CV améliorée
router.post('/generate-cv', upload.single('cvFile'), async (req, res) => {
  try {
    const { profileData } = req.body;
    
    // Vérification des données d'entrée
    if (!profileData || typeof profileData !== 'object') {
      return res.status(400).json({ error: 'Données de profil invalides' });
    }

    const prompt = `Génère un CV professionnel en format Markdown à partir de ces informations :
${JSON.stringify(profileData, null, 2)}

Inclus les sections suivantes si pertinentes :
- En-tête avec nom et coordonnées
- Profil professionnel
- Expérience professionnelle
- Formation
- Compétences techniques
- Langues
- Projets`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'Tu es un expert RH spécialisé dans la rédaction de CV professionnels. Ton output doit être en Markdown.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    res.json({ 
      cv: completion.choices[0].message.content,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la génération du CV',
      details: error.message
    });
  }
});

// Proposition de CV au recruteur améliorée
router.post('/recommend-cv', async (req, res) => {
  try {
    const { jobDescription, candidateCVs } = req.body;

    if (!jobDescription || !candidateCVs) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const prompt = `Analyse cette description de poste et ces CVs :
Description du poste:
${jobDescription}

CVs des candidats:
${JSON.stringify(candidateCVs, null, 2)}

Fais une analyse détaillée pour chaque candidat :
1. Adéquation globale (1-5 étoiles)
2. Points forts
3. Points faibles
4. Recommandation (Fortement recommandé/Recommandé/Neutre/Non recommandé)`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'Tu es un expert RH spécialisé en recrutement. Fournis une analyse structurée et objective.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 3000
    });

    res.json({ 
      analysis: completion.choices[0].message.content,
      model: completion.model
    });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'analyse',
      details: error.message
    });
  }
});

// Génération de lettre de motivation améliorée
router.post('/generate-letter', async (req, res) => {
  try {
    const { candidateProfile, jobDetails } = req.body;

    if (!candidateProfile || !jobDetails) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const prompt = `Rédige une lettre de motivation professionnelle en français avec ces éléments :

Profil du candidat:
${JSON.stringify(candidateProfile, null, 2)}

Détails du poste:
${JSON.stringify(jobDetails, null, 2)}

Structure demandée :
1. En-tête avec coordonnées
2. Objet clair
3. Introduction percutante
4. Corps avec 2-3 paragraphes
5. Conclusion professionnelle
6. Formule de politesse`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'Tu es un expert en rédaction de lettres de motivation. Le style doit être professionnel mais pas trop formel.' 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    res.json({ 
      coverLetter: completion.choices[0].message.content,
      model: completion.model
    });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ 
      error: 'Erreur lors de la génération',
      details: error.message
    });
  }
});

module.exports = router;