import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RecruiterApplications = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState('candidates');
  const [applications, setApplications] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [recherche, setRecherche] = useState('');

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

  // Charger les candidatures fictives
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        candidatNom: 'Jean Dupont',
        poste: 'Développeur Full Stack',
        matching: 92,
        dateCandidature: '2025-03-20',
        statut: 'en_attente',
        experience: '5 ans',
        competences: ['React', 'Node.js', 'MongoDB'],
        entretienDate: null
      },
      {
        id: 2,
        candidatNom: 'Marie Martin',
        poste: 'UX/UI Designer',
        matching: 88,
        dateCandidature: '2025-03-19',
        statut: 'entretien',
        experience: '3 ans',
        competences: ['Figma', 'Adobe XD', 'User Research'],
        entretienDate: '2025-04-05'
      },
      {
        id: 3,
        candidatNom: 'Lucas Bernard',
        poste: 'Développeur Frontend',
        matching: 78,
        dateCandidature: '2025-03-18',
        statut: 'rejete',
        experience: '2 ans',
        competences: ['HTML/CSS', 'JavaScript', 'Vue.js'],
        entretienDate: null
      },
      {
        id: 4,
        candidatNom: 'Sophie Dubois',
        poste: 'Product Owner',
        matching: 95,
        dateCandidature: '2025-03-15',
        statut: 'accepte',
        experience: '4 ans',
        competences: ['Agile', 'Scrum', 'User Stories'],
        entretienDate: '2025-03-30'
      }
    ];
    
    setApplications(mockApplications);
  }, []);

  // Filtrer les candidatures
  const applicationsFiltrees = applications.filter(app => {
    const matchStatut = filtreStatut === 'tous' || app.statut === filtreStatut;
    const matchRecherche = app.candidatNom.toLowerCase().includes(recherche.toLowerCase()) || 
                          app.poste.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });

  // Gérer les changements de statut
  const handleStatusChange = (id, newStatus) => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          // Si on accepte une candidature, programmer un entretien automatiquement
          if (newStatus === 'accepte') {
            return { 
              ...app, 
              statut: newStatus,
              entretienDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // date dans 7 jours
            };
          }
          return { ...app, statut: newStatus };
        }
        return app;
      })
    );
    
    // Afficher une notification
    alert(`Statut de la candidature mis à jour: ${formatStatus(newStatus)}`);
  };

  // Gérer la planification d'entretien
  const handleScheduleInterview = (id, date) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, entretienDate: date, statut: 'entretien' } : app
      )
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'en_attente': return '#3498db';
      case 'entretien': return '#f39c12';
      case 'accepte': return '#2ecc71';
      case 'rejete': return '#e74c3c';
      default: return '#3498db';
    }
  };

  const formatStatus = (status) => {
    switch(status) {
      case 'en_attente': return 'En attente';
      case 'entretien': return 'Entretien programmé';
      case 'accepte': return 'Candidature acceptée';
      case 'rejete': return 'Candidature refusée';
      default: return status;
    }
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
            <h1 className="dashboard-title">Gestion des candidatures</h1>
            <div className="dashboard-actions">
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Rechercher un candidat..." 
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <div className="filter-container">
              // Suite de RecruiterApplications.js
                <select 
                  className="filter-select"
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="entretien">Entretien programmé</option>
                  <option value="accepte">Acceptée</option>
                  <option value="rejete">Refusée</option>
                </select>
              </div>
            </div>
          </div>

          {/* Liste des candidatures */}
          <div className="applications-list">
            {applicationsFiltrees.length > 0 ? (
              applicationsFiltrees.map((application) => (
                <div key={application.id} className="application-card">
                  <div className="application-header">
                    <div className="candidate-info">
                      <div className="candidate-avatar">
                        {application.candidatNom.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="candidate-name">{application.candidatNom}</h3>
                        <p className="candidate-position">{application.poste}</p>
                        <p className="candidate-experience">{application.experience} d'expérience</p>
                      </div>
                    </div>
                    <div className="application-matching">
                      <div className="matching-circle">
                        <svg width="60" height="60" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a40" strokeWidth="12" />
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="54" 
                            fill="none" 
                            stroke="#8c52ff" 
                            strokeWidth="12" 
                            strokeDasharray={`${2 * Math.PI * 54 * application.matching / 100} ${2 * Math.PI * 54 * (100 - application.matching) / 100}`}
                            strokeDashoffset={(2 * Math.PI * 54 * 25) / 100}
                          />
                          <text x="60" y="65" textAnchor="middle" fill="white" fontSize="24px" fontWeight="bold">
                            {application.matching}%
                          </text>
                        </svg>
                      </div>
                      <p>Matching</p>
                    </div>
                  </div>

                  <div className="application-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="detail-label">Date de candidature:</span>
                        <span className="detail-value">{new Date(application.dateCandidature).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Statut:</span>
                        <span className="detail-value status" style={{ backgroundColor: getStatusColor(application.statut) }}>
                          {formatStatus(application.statut)}
                        </span>
                      </div>
                      {application.entretienDate && (
                        <div className="detail-item">
                          <span className="detail-label">Date d'entretien:</span>
                          <span className="detail-value">{new Date(application.entretienDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>

                    <div className="candidate-skills">
                      {application.competences.map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="application-actions">
                    <button className="action-button view-btn">
                      <i className="fas fa-eye"></i>
                      <span>Voir CV</span>
                    </button>
                    
                    {application.statut === 'en_attente' && (
                      <>
                        <button 
                          className="action-button schedule-btn"
                          onClick={() => handleScheduleInterview(application.id, '2025-04-10')}
                        >
                          <i className="fas fa-calendar"></i>
                          <span>Planifier entretien</span>
                        </button>
                        <button 
                          className="action-button reject-btn"
                          onClick={() => handleStatusChange(application.id, 'rejete')}
                        >
                          <i className="fas fa-times"></i>
                          <span>Refuser</span>
                        </button>
                      </>
                    )}
                    
                    {application.statut === 'entretien' && (
                      <>
                        <button 
                          className="action-button accept-btn"
                          onClick={() => handleStatusChange(application.id, 'accepte')}
                        >
                          <i className="fas fa-check"></i>
                          <span>Accepter</span>
                        </button>
                        <button 
                          className="action-button reject-btn"
                          onClick={() => handleStatusChange(application.id, 'rejete')}
                        >
                          <i className="fas fa-times"></i>
                          <span>Refuser</span>
                        </button>
                      </>
                    )}
                    
                    {(application.statut === 'accepte' || application.statut === 'rejete') && (
                      <button className="action-button message-btn">
                        <i className="fas fa-envelope"></i>
                        <span>Message</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-applications">
                <i className="fas fa-search no-results-icon"></i>
                <p>Aucune candidature ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterApplications;