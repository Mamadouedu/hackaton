import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CandidateSignup = () => {
  const navigate = useNavigate();
  const { signupCandidate } = useAuth();
  const [activeTab, setActiveTab] = useState('candidat');
  const [signupMethod, setSignupMethod] = useState(null);
  const [matchingRate, setMatchingRate] = useState(85);
  const [stars, setStars] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  // Génération des étoiles pour le background
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 2}px`,
          duration: `${Math.random() * 5 + 3}s`
        });
      }
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  // Pour simuler un changement du taux de matching lorsqu'on choisit une méthode
  useEffect(() => {
    if (signupMethod) {
      // Simuler une progression du taux de matching
      let rate = 85;
      const interval = setInterval(() => {
        rate += 1;
        setMatchingRate(rate);
        if (rate >= 95) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [signupMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    // Validation générale du formulaire
    if (!formData.email) {
      setError('Veuillez saisir une adresse email');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    
    return true;
  };

  const handleMethodSelect = async (method) => {
    // Réinitialiser l'erreur
    setError('');

    if (method === 'manual' || method === 'ai') {
      // Vérifier que les champs sont remplis
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      if (!validateForm()) {
        return;
      }

      try {
        // Créer un candidat avec les informations de base
        const candidateData = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName || 'Utilisateur',
          lastName: formData.lastName || 'Candidat'
        };
        
        // Inscrire le candidat
        await signupCandidate(candidateData);
        
        // Rediriger selon la méthode choisie
        if (method === 'manual' || method === 'ai') {
          // Rediriger vers l'analyse de CV pour créer le profil
          navigate('/cv-analysis');
        }
      } catch (error) {
        setError('Erreur lors de l\'inscription');
        console.error("Erreur lors de l'inscription candidat:", error);
      }
    } else if (method === 'linkedin') {
      // Rediriger vers le callback LinkedIn
      navigate('/linkedin-callback');
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Stars background */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration} infinite`
            }}
          />
        ))}
      </div>
      
      <div className="candidate-container">
        <div className="candidate-card">
          <div className="tabs">
            <Link 
              to="/login" 
              className={`tab ${activeTab === 'connexion' ? 'active' : ''}`}
            >
              Connexion
            </Link>
            <Link 
              to="/recruiter-signup" 
              className={`tab ${activeTab === 'recruteur' ? 'active' : ''}`}
            >
              Recruteur
            </Link>
            <button 
              className={`tab ${activeTab === 'candidat' ? 'active' : ''}`}
              onClick={() => setActiveTab('candidat')}
            >
              Candidat
            </button>
          </div>
          
          <h2>Créer un compte Candidat</h2>
          <p className="candidate-intro">
            Bienvenue sur notre plateforme de matching intelligent. Créez votre profil et découvrez les opportunités qui
            correspondent parfaitement à vos compétences et aspirations.
          </p>
          
          <h3 className="method-heading">Choisissez votre méthode d'inscription</h3>
          
          {error && <div className="login-error">{error}</div>}
          
          <div className="signup-methods">
            <div className="method-card" onClick={() => setSignupMethod('manual')}>
              <div className="method-icon">
                <i className="method-icon-file"></i>
              </div>
              <h4>Créer mon profil</h4>
              <p>Remplissez manuellement votre CV pour créer votre profil</p>
              
              {signupMethod === 'manual' && (
                <form className="signup-form">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre-email@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Créez un mot de passe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                  </div>
                  <button 
                    type="button" 
                    className="method-btn"
                    onClick={() => handleMethodSelect('manual')}
                  >
                    Commencer
                  </button>
                </form>
              )}
            </div>
            
            <div className="method-card" onClick={() => setSignupMethod('linkedin')}>
              <div className="method-icon">
                <i className="method-icon-link"></i>
              </div>
              <h4>Importer depuis LinkedIn</h4>
              <p>Connectez votre compte LinkedIn pour importer votre profil professionnel</p>
              
              {signupMethod === 'linkedin' && (
                <form className="signup-form">
                  <div className="form-group">
                    <label>Email LinkedIn</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre-email@linkedin.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mot de passe LinkedIn</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Votre mot de passe LinkedIn"
                      required
                    />
                  </div>
                  <button 
                    type="button" 
                    className="method-btn"
                    onClick={() => handleMethodSelect('linkedin')}
                  >
                    Connecter
                  </button>
                </form>
              )}
            </div>
            
            <div className="method-card" onClick={() => setSignupMethod('ai')}>
              <div className="method-icon">
                <i className="method-icon-robot"></i>
              </div>
              <h4>Aide IA pour votre CV</h4>
              <p>Notre IA peut vous aider à créer ou améliorer votre CV</p>
              
              {signupMethod === 'ai' && (
                <form className="signup-form">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre-email@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Créez un mot de passe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmez votre mot de passe"
                      required
                    />
                  </div>
                  <button 
                    type="button" 
                    className="method-btn"
                    onClick={() => handleMethodSelect('ai')}
                  >
                    Démarrer
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="matching-section">
            <div className="matching-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a40" strokeWidth="12" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="#8c52ff" 
                  strokeWidth="12" 
                  strokeDasharray={`${2 * Math.PI * 54 * matchingRate / 100} ${2 * Math.PI * 54 * (100 - matchingRate) / 100}`}
                  strokeDashoffset={(2 * Math.PI * 54 * 25) / 100} // Décalage pour commencer en haut
                />
                <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24px" fontWeight="bold">
                  {matchingRate}%
                </text>
              </svg>
            </div>
            <div className="matching-info">
              <h4>Taux de réussite de matching</h4>
              <p>
                Notre algorithme IA analyse plus de 50 critères pour vous mettre en relation avec les opportunités qui
                correspondent parfaitement à vos compétences et aspirations professionnelles.
              </p>
            </div>
          </div>
          
          <h3 className="features-heading">Fonctionnalités pour les candidats</h3>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-target"></div>
              <h4>Matching IA précis</h4>
              <p>Trouvez le job idéal pour votre profil</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-track"></div>
              <h4>Suivi des candidatures</h4>
              <p>Suivez vos candidatures en temps réel</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-edit"></div>
              <h4>Aide à la rédaction IA</h4>
              <p>Perfectionnez vos lettres et CV</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-alert"></div>
              <h4>Alertes personnalisées</h4>
              <p>Recevez des offres sur mesure</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-chart"></div>
              <h4>Analyse du marché</h4>
              <p>Explorez les tendances de votre secteur</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-lock"></div>
              <h4>Confidentialité</h4>
              <p>Gérez qui peut consulter votre profil</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSignup;