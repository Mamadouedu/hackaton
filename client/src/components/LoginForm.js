import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      // Tenter la connexion avec le contexte d'authentification
      const result = await login(formData.email, formData.password);
      
      // Rediriger selon le type d'utilisateur
      if (result.type === 'recruiter') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/candidate-dashboard');
      }
    } catch (error) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-right">
      <h2>Connexion à votre compte</h2>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            Se souvenir de moi
          </label>
          <a href="/forgot-password" className="forgot-password">Mot de passe oublié?</a>
        </div>

        <button 
          type="submit" 
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div className="login-divider">
        <span>Ou se connecter avec</span>
      </div>

      <div className="social-login">
        <button className="social-btn facebook-btn">
          <i className="fab fa-facebook-f"></i>
        </button>
        <button className="social-btn twitter-btn">
          <i className="fab fa-twitter"></i>
        </button>
        <button className="social-btn google-btn">
          <i className="fab fa-google"></i>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;