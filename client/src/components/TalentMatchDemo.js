import React, { useState, useEffect } from 'react';
import '../styles.css'; // Assurez-vous d'importer votre fichier CSS

const TalentMatchDemo = () => {
  const [activeTab, setActiveTab] = useState('connexion');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Générer les étoiles pour le background
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
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Connexion avec: ${formData.email}`);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">TM</div>
          <span>TalentMatch</span>
        </div>
        <div className="nav-links">
          <a href="/entreprises" className="nav-link">Entreprises</a>
          <a href="/offres" className="nav-link">Offres</a>
          <a href="/candidats" className="nav-link">Candidats</a>
          <a href="/conseils" className="nav-link">Conseils</a>
        </div>
      </nav>
      
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
      
      {/* Login Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Left Side */}
          <div className="login-left">
            <div className="login-logo">TM</div>
            <h2>Bienvenue</h2>
            <p>sur TalentMatch</p>
            
            <p>Plateforme de recrutement intelligente<br />basée sur l'IA</p>
            
            <ul className="features-list">
              <li>Matching IA précis</li>
              <li>Importation LinkedIn</li>
              <li>Assistance ChatGPT</li>
            </ul>
            
            <div className="register-link">
              Pas encore inscrit?
              <div>
                <button className="register-btn">S'inscrire</button>
              </div>
            </div>
          </div>
          
          {/* Right Side */}
          <div className="login-right">
            <div className="login-tabs">
              <button 
                className={`login-tab ${activeTab === 'connexion' ? 'active' : ''}`}
                onClick={() => setActiveTab('connexion')}
              >
                Connexion
              </button>
              <button 
                className={`login-tab ${activeTab === 'recruteur' ? 'active' : ''}`}
                onClick={() => setActiveTab('recruteur')}
              >
                Recruteur
              </button>
              <button 
                className={`login-tab ${activeTab === 'candidat' ? 'active' : ''}`}
                onClick={() => setActiveTab('candidat')}
              >
                Candidat
              </button>
            </div>

            <h2>Connexion à votre compte</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="exemple@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-check">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <label htmlFor="rememberMe">Se souvenir de moi</label>
                </div>
                <a href="/forgot-password" className="forgot-password">Mot de passe oublié?</a>
              </div>

              <button type="submit" className="login-btn">
                Se connecter
              </button>
            </form>

            <div className="login-divider">
              <span>Ou se connecter avec</span>
            </div>

            <div className="social-login">
              <button className="social-btn facebook-btn">f</button>
              <button className="social-btn twitter-btn">t</button>
              <button className="social-btn google-btn">G</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="recruiter-link">
        Je suis...<br />
        <a href="/recruiter-signup">Recruteur</a>
      </div>
    </div>
  );
};

export default TalentMatchDemo;