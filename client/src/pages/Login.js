import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  const [stars, setStars] = useState([]);
  
  // Fonction pour créer les étoiles dans le background de manière plus optimisée
  useEffect(() => {
    // Générer les données des étoiles
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
    
    // Pas besoin de nettoyage car nous utilisons React pour rendre les étoiles
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Stars background using React */}
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
      
      <div className="login-container">
        <div className="login-card">
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
    <Link to="/recruiter-signup" className="register-btn">
      S'inscrire
    </Link>
  </div>
</div>
          </div>
          
          <LoginForm />
        </div>
      </div>
      
      <div className="recruiter-link">
        Je suis...<br />
        <Link to="/recruiter-signup">Recruteur</Link>
      </div>
    </>
  );
};

export default Login;