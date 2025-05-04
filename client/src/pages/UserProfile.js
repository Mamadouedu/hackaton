import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser, userType } = useAuth();
  const [stars, setStars] = useState([]);
  const [activeSection, setActiveSection] = useState('profile');
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  
  // Obtenir les initiales correctes selon le type d'utilisateur
  const getUserInitials = () => {
    if (userType === 'recruiter') {
      return currentUser?.profile?.fullName
        ? currentUser.profile.fullName.split(' ').map(n => n[0]).join('')
        : 'R';
    } else {
      return `${currentUser?.profile?.firstName?.charAt(0) || 'C'}${currentUser?.profile?.lastName?.charAt(0) || 'U'}`;
    }
  };

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
              <span className="notification-badge">3</span>
              <i className="far fa-bell"></i>
            </div>
          </div>
          <div className="user-avatar">
            {getUserInitials()}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-heading">
              {userType === 'recruiter' ? 'RECRUTEUR' : 'CANDIDAT'}
            </h3>
            <ul className="sidebar-menu">
              <li className="sidebar-item">
                <Link to={userType === 'recruiter' ? "/recruiter-dashboard" : "/candidate-dashboard"} className="sidebar-link">
                  <i className="sidebar-icon fas fa-chart-bar"></i>
                  <span>Tableau de bord</span>
                </Link>
              </li>
              {userType === 'recruiter' ? (
                <>
                  <li className="sidebar-item">
                    <Link to="/new-job-offer" className="sidebar-link">
                      <i className="sidebar-icon fas fa-briefcase"></i>
                      <span>Gérer mes offres</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/applications-management" className="sidebar-link">
                      <i className="sidebar-icon fas fa-users"></i>
                      <span>Candidatures</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/interview-calendar" className="sidebar-link">
                      <i className="sidebar-icon fas fa-calendar-alt"></i>
                      <span>Entretiens</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="sidebar-item">
                    <Link to="/offres-emploi" className="sidebar-link">
                      <i className="sidebar-icon fas fa-briefcase"></i>
                      <span>Offres d'emploi</span>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link to="/mes-candidatures" className="sidebar-link">
                      <i className="sidebar-icon fas fa-file-alt"></i>
                      <span>Mes candidatures</span>
                    </Link>
                  </li>
                </>
              )}
              <li className="sidebar-item">
                <Link to="/messages" className="sidebar-link">
                  <i className="sidebar-icon fas fa-comment-alt"></i>
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-heading">PROFIL</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-item active">
                <Link to="/user-profile" className="sidebar-link">
                  <i className="sidebar-icon fas fa-user"></i>
                  <span>Mon profil</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/parametres" className="sidebar-link">
                  <i className="sidebar-icon fas fa-cog"></i>
                  <span>Paramètres</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main profile */}
        <main className="dashboard-main">
          <div className="profile-container">
            {/* En-tête du profil */}
            <div className="profile-header">
              <div className="profile-photo">
                <div className="profile-initials">
                  {getUserInitials()}
                </div>
              </div>
              <div className="profile-title">
                <h1 className="profile-name">
                  {userType === 'recruiter' 
                    ? currentUser?.profile?.fullName || 'Nom du recruteur'
                    : `${currentUser?.profile?.firstName || 'Prénom'} ${currentUser?.profile?.lastName || 'Nom'}`}
                </h1>
                <p className="profile-poste">
                  {userType === 'recruiter' 
                    ? `${currentUser?.profile?.position || 'Poste'} - ${currentUser?.profile?.companyName || 'Entreprise'}`
                    : currentUser?.profile?.headline || 'Titre professionnel'}
                </p>
                <p className="profile-localisation">
                  <i className="fas fa-map-marker-alt"></i>
                  {currentUser?.profile?.location || 'Localisation'}
                </p>
              </div>
              <div className="profile-actions">
                {userType === 'candidate' && (
                  <button className="profile-action-btn download-btn">
                    <i className="fas fa-download"></i>
                    Télécharger CV
                  </button>
                )}
                <button className="profile-action-btn share-btn">
                  <i className="fas fa-share-alt"></i>
                  Partager
                </button>
                <button className="profile-action-btn preview-btn">
                  <i className="fas fa-eye"></i>
                  Aperçu public
                </button>
              </div>
            </div>

            {/* Navigation du profil */}
            <div className="profile-nav">
              <button 
                className={`profile-nav-btn ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                <i className="fas fa-user"></i>
                Informations
              </button>
              {userType === 'candidate' && (
                <>
                  <button 
                    className={`profile-nav-btn ${activeSection === 'experiences' ? 'active' : ''}`}
                    onClick={() => setActiveSection('experiences')}
                  >
                    <i className="fas fa-briefcase"></i>
                    Expériences
                  </button>
                  <button 
                    className={`profile-nav-btn ${activeSection === 'formations' ? 'active' : ''}`}
                    onClick={() => setActiveSection('formations')}
                  >
                    <i className="fas fa-graduation-cap"></i>
                    Formations
                  </button>
                  <button 
                    className={`profile-nav-btn ${activeSection === 'competences' ? 'active' : ''}`}
                    onClick={() => setActiveSection('competences')}
                  >
                    <i className="fas fa-code"></i>
                    Compétences
                  </button>
                </>
              )}
              {userType === 'recruiter' && (
                <>
                  <button 
                    className={`profile-nav-btn ${activeSection === 'company' ? 'active' : ''}`}
                    onClick={() => setActiveSection('company')}
                  >
                    <i className="fas fa-building"></i>
                    Entreprise
                  </button>
                  <button 
                    className={`profile-nav-btn ${activeSection === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveSection('stats')}
                  >
                    <i className="fas fa-chart-line"></i>
                    Statistiques
                  </button>
                </>
              )}
              <button 
                className={`profile-nav-btn ${activeSection === 'security' ? 'active' : ''}`}
                onClick={() => setActiveSection('security')}
              >
                <i className="fas fa-lock"></i>
                Sécurité
              </button>
            </div>

            {/* Contenu du profil - différents onglets selon le type d'utilisateur */}
            <div className="profile-content">
              {activeSection === 'profile' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Informations personnelles</h2>
                    <button className="edit-btn">
                      <i className="fas fa-edit"></i>
                      Modifier
                    </button>
                  </div>
                  
                  <div className="info-grid">
                    {userType === 'recruiter' ? (
                      // Informations pour recruteur
                      <>
                        <div className="info-item">
                          <span className="info-label">Nom complet</span>
                          <span className="info-value">{currentUser?.profile?.fullName || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Poste</span>
                          <span className="info-value">{currentUser?.profile?.position || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email</span>
                          <span className="info-value">{currentUser?.email || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Téléphone</span>
                          <span className="info-value">{currentUser?.profile?.phoneNumber || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">LinkedIn</span>
                          <span className="info-value">{currentUser?.profile?.linkedin || 'Non renseigné'}</span>
                        </div>
                      </>
                    ) : (
                      // Informations pour candidat
                      <>
                        <div className="info-item">
                          <span className="info-label">Prénom</span>
                          <span className="info-value">{currentUser?.profile?.firstName || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Nom</span>
                          <span className="info-value">{currentUser?.profile?.lastName || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email</span>
                          <span className="info-value">{currentUser?.email || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Téléphone</span>
                          <span className="info-value">{currentUser?.profile?.phoneNumber || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Poste actuel</span>
                          <span className="info-value">{currentUser?.profile?.headline || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Localisation</span>
                          <span className="info-value">{currentUser?.profile?.location || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Disponibilité</span>
                          <span className="info-value">{currentUser?.profile?.availability || 'Non renseigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">LinkedIn</span>
                          <span className="info-value">{currentUser?.profile?.linkedin || 'Non renseigné'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {userType === 'recruiter' && activeSection === 'company' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Informations de l'entreprise</h2>
                    <button className="edit-btn">
                      <i className="fas fa-edit"></i>
                      Modifier
                    </button>
                  </div>
                  
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Nom de l'entreprise</span>
                      <span className="info-value">{currentUser?.profile?.companyName || 'Non renseigné'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Secteur d'activité</span>
                      <span className="info-value">{currentUser?.profile?.sector || 'Non renseigné'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Taille de l'entreprise</span>
                      <span className="info-value">{currentUser?.profile?.companySize || 'Non renseigné'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Site web</span>
                      <span className="info-value">{currentUser?.profile?.website || 'Non renseigné'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Sécurité du compte</h2>
                    <button className="edit-btn">
                      <i className="fas fa-edit"></i>
                      Modifier
                    </button>
                  </div>
                  
                  <div className="security-section">
                    <h3>Mot de passe</h3>
                    <p>Votre mot de passe a été modifié pour la dernière fois il y a 30 jours</p>
                    <button className="security-btn">Changer le mot de passe</button>
                  </div>
                  
                  <div className="security-section">
                    <h3>Authentification à deux facteurs</h3>
                    <p>Non activée - Améliorez la sécurité de votre compte en activant l'authentification à deux facteurs</p>
                    <button className="security-btn">Activer</button>
                  </div>
                  
                  <div className="security-section">
                    <h3>Sessions actives</h3>
                    <div className="session-item">
                      <div className="session-info">
                        <i className="fas fa-laptop"></i>
                        <div>
                          <strong>Chrome sur Windows</strong>
                          <p>Paris, France - Connecté il y a 2 heures</p>
                        </div>
                      </div>
                      <span className="current-session">Session actuelle</span>
                    </div>
                    <button className="security-btn danger">Déconnecter toutes les autres sessions</button>
                  </div>
                </div>
              )}

              {userType === 'candidate' && activeSection === 'experiences' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Expériences professionnelles</h2>
                    <button className="add-btn">
                      <i className="fas fa-plus"></i>
                      Ajouter une expérience
                    </button>
                  </div>
                  
                  <div className="experiences-list">
                    {currentUser?.profile?.experiences?.length > 0 ? (
                      currentUser.profile.experiences.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <div className="experience-header">
                            <div className="experience-period">
                              {exp.dateDebut} - {exp.dateFin || 'Présent'}
                            </div>
                            <div className="experience-actions">
                              <button className="action-icon edit-icon">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="action-icon delete-icon">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <div className="experience-content">
                            <h3 className="experience-poste">{exp.poste}</h3>
                            <p className="experience-entreprise">{exp.entreprise} - {exp.localisation}</p>
                            <p className="experience-description">{exp.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-briefcase empty-icon"></i>
                        <p>Vous n'avez pas encore ajouté d'expériences professionnelles</p>
                        <button className="empty-action-btn">
                          <i className="fas fa-plus"></i>
                          Ajouter une expérience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;