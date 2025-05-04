import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const LinkedInCallback = () => {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Connexion avec LinkedIn en cours...');
  const navigate = useNavigate();
  const { signupCandidate } = useAuth();

  useEffect(() => {
    const simulateLinkedInAuth = async () => {
      try {
        // Dans un scénario réel, vous valideriez les identifiants auprès de LinkedIn
        const mockLinkedInData = {
          email: 'jean.dupont.linkedin@example.com',
          firstName: 'Jean',
          lastName: 'Dupont',
          type: 'candidate'
        };

        // Inscription du candidat
        await signupCandidate(mockLinkedInData);

        setStatus('success');
        setMessage('Connexion LinkedIn réussie! Redirection en cours...');
        
        // Rediriger vers la page d'analyse de CV
        setTimeout(() => {
          navigate('/cv-analysis');
        }, 1500);

      } catch (error) {
        console.error('Erreur lors de la connexion LinkedIn:', error);
        setStatus('error');
        setMessage('Échec de la connexion LinkedIn. Veuillez réessayer.');
      }
    };

    simulateLinkedInAuth();
  }, [navigate, signupCandidate]);

  return (
    <>
      <Navbar />
      <div className="linkedin-callback-container">
        <div className="linkedin-callback-card">
          <div className={`linkedin-callback-status ${status}`}>
            {status === 'loading' && (
              <div className="loader"></div>
            )}
            {status === 'success' && (
              <div className="success-icon">✓</div>
            )}
            {status === 'error' && (
              <div className="error-icon">!</div>
            )}
          </div>
          <h2>
            {status === 'loading' ? 'Traitement en cours' : 
             status === 'success' ? 'Connexion réussie' : 
             'Erreur de connexion'}
          </h2>
          <p>{message}</p>
          {status === 'error' && (
            <button 
              className="retry-button" 
              onClick={() => navigate('/candidate-signup')}
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkedInCallback;