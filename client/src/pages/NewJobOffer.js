import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NewJobOffer = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState('jobs');
  const [formData, setFormData] = useState({
    titre: '',
    entreprise: currentUser?.profile?.companyName || '',
    localisation: '',
    typeContrat: 'CDI',
    experienceRequise: '0-2 ans',
    secteur: 'Informatique',
    salaire: '',
    description: '',
    competences: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi des données
    alert('Offre créée avec succès!');
    navigate('/recruiter-dashboard');
  };

  return (
    <div className="dashboard-container">
      {/* Background stars */}
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

      {/* Top navigation */}
      <header className="dashboard-header">
        <div className="header-logo">
          <Link to="/" className="logo">
            <div className="logo-icon">TM</div>
            <span>TalentMatch</span>
          </Link>
        </div>
        <nav className="header-nav">
          <Link to="/entreprises" className="nav-link">Entreprises</Link>
          <Link to="/offres" className="nav-link">Offres</Link>
          <Link to="/candidats" className="nav-link">Candidats</Link>
          <Link to="/conseils" className="nav-link">Conseils</Link>
        </nav>
        <div className="header-actions">
          <div className="notifications">
            <div className="notification-icon">
              <span className="notification-badge">1</span>
              <i className="far fa-bell"></i>
            </div>
          </div>
          <div className="user-avatar">
            MD
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-heading">PRINCIPAL</h3>
            <ul className="sidebar-menu">
              <li className={`sidebar-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenuItem('dashboard')}>
                <Link to="/recruiter-dashboard">
                  <i className="sidebar-icon fas fa-chart-bar"></i>
                  <span>Tableau de bord</span>
                </Link>
              </li>
              <li className={`sidebar-item ${activeMenuItem === 'jobs' ? 'active' : ''}`} onClick={() => setActiveMenuItem('jobs')}>
                <Link to="/new-job-offer">
                  <i className="sidebar-icon fas fa-briefcase"></i>
                  <span>Gérer mes offres</span>
                </Link>
              </li>
              <li className={`sidebar-item ${activeMenuItem === 'candidates' ? 'active' : ''}`} onClick={() => setActiveMenuItem('candidates')}>
                <Link to="/applications-management">
                  <i className="sidebar-icon fas fa-users"></i>
                  <span>Candidatures</span>
                </Link>
              </li>
              <li className={`sidebar-item ${activeMenuItem === 'interviews' ? 'active' : ''}`} onClick={() => setActiveMenuItem('interviews')}>
                <Link to="/interview-calendar">
                  <i className="sidebar-icon fas fa-calendar-alt"></i>
                  <span>Entretiens</span>
                </Link>
              </li>
              <li className={`sidebar-item ${activeMenuItem === 'messages' ? 'active' : ''}`} onClick={() => setActiveMenuItem('messages')}>
                <Link to="/messages">
                  <i className="sidebar-icon fas fa-comment-alt"></i>
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-heading">OUTILS</h3>
            <ul className="sidebar-menu">
              <li className={`sidebar-item ${activeMenuItem === 'stats' ? 'active' : ''}`} onClick={() => setActiveMenuItem('stats')}>
                <i className="sidebar-icon fas fa-chart-line"></i>
                <span>Statistiques</span>
              </li>
              <li className={`sidebar-item ${activeMenuItem === 'settings' ? 'active' : ''}`} onClick={() => setActiveMenuItem('settings')}>
                <i className="sidebar-icon fas fa-cog"></i>
                <span>Paramètres</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Créer une nouvelle offre</h1>
            <div className="dashboard-actions">
              <button className="action-btn" onClick={() => navigate('/recruiter-dashboard')}>
                <i className="fas fa-arrow-left"></i>
                Retour
              </button>
            </div>
          </div>

          <div className="job-form-container">
            <form onSubmit={handleSubmit} className="job-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Titre du poste*</label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Développeur Full Stack"
                  />
                </div>
                <div className="form-group">
                  <label>Entreprise*</label>
                  <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    required
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Localisation*</label>
                  <input
                    type="text"
                    name="localisation"
                    value={formData.localisation}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Paris, France"
                  />
                </div>
                <div className="form-group">
                  <label>Type de contrat*</label>
                  <select
                    name="typeContrat"
                    value={formData.typeContrat}
                    onChange={handleChange}
                    required
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expérience requise*</label>
                  <select
                    name="experienceRequise"
                    value={formData.experienceRequise}
                    onChange={handleChange}
                    required
                  >
                    <option value="0-2 ans">0-2 ans</option>
                    <option value="2-5 ans">2-5 ans</option>
                    <option value="5+ ans">5+ ans</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Secteur*</label>
                  <select
                    name="secteur"
                    value={formData.secteur}
                    onChange={handleChange}
                    required
                  >
                    <option value="Informatique">Informatique</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Salaire</label>
                <input
                  type="text"
                  name="salaire"
                  value={formData.salaire}
                  onChange={handleChange}
                  placeholder="Ex: 45k€ - 55k€ ou selon profil"
                />
              </div>

              <div className="form-group">
                <label>Description du poste*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Décrivez les responsabilités et missions du poste..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Compétences requises*</label>
                <input
                  type="text"
                  name="competences"
                  value={formData.competences}
                  onChange={handleChange}
                  required
                  placeholder="Ex: React, Node.js, MongoDB (séparées par des virgules)"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/recruiter-dashboard')}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  Publier l'offre
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewJobOffer;