import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MonProfil = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [activeSection, setActiveSection] = useState('infos');
  const [editMode, setEditMode] = useState(false);
  
  // États initialisés vides, à remplir avec les données du CV
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    location: '',
    email: '',
    phone: ''
  });
  
  const [experiences, setExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [langues, setLangues] = useState([]);

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

  // Récupérer les données extraites du CV lors du chargement
  useEffect(() => {
    // Simuler la récupération des données extraites du CV
    const fetchCVData = async () => {
      try {
        // Dans une application réelle, ces données viendraient du contexte d'authentification
        // ou d'une API après l'analyse du CV
        
        // Simuler un délai de chargement
        setTimeout(() => {
          // Données personnelles
          setProfileData({
            firstName: currentUser?.profile?.firstName || 'Jean',
            lastName: currentUser?.profile?.lastName || 'Dupont',
            headline: 'Développeur Full Stack',
            location: 'Paris, France',
            email: currentUser?.email || 'jean.dupont@example.com',
            phone: '+33 6 12 34 56 78'
          });
          
          // Expériences extraites du CV
          setExperiences([
            {
              id: 1,
              poste: "Développeur Full Stack",
              entreprise: "TechVision",
              localisation: "Paris",
              dateDebut: "2021-01",
              dateFin: null,
              description: "Développement d'applications web utilisant React et Node.js"
            },
            {
              id: 2,
              poste: "Développeur Frontend",
              entreprise: "WebStudio",
              localisation: "Lyon",
              dateDebut: "2019-03",
              dateFin: "2020-12",
              description: "Création d'interfaces utilisateur avec React et Redux"
            }
          ]);
          
          // Formations extraites du CV
          setFormations([
            {
              id: 1,
              diplome: "Master en Développement Web",
              etablissement: "Université Paris Tech",
              localisation: "Paris",
              dateDebut: "2017-09",
              dateFin: "2019-06"
            },
            {
              id: 2,
              diplome: "Licence en Informatique",
              etablissement: "Université de Lyon",
              localisation: "Lyon",
              dateDebut: "2014-09",
              dateFin: "2017-06"
            }
          ]);
          
          // Compétences extraites du CV
          setCompetences([
            { id: 1, nom: "React", niveau: 90 },
            { id: 2, nom: "Node.js", niveau: 85 },
            { id: 3, nom: "JavaScript", niveau: 95 },
            { id: 4, nom: "MongoDB", niveau: 80 },
            { id: 5, nom: "TypeScript", niveau: 75 },
            { id: 6, nom: "CSS/SASS", niveau: 85 }
          ]);
          
          // Langues extraites du CV
          setLangues([
            { id: 1, langue: "Français", niveau: "Langue maternelle" },
            { id: 2, langue: "Anglais", niveau: "Courant" },
            { id: 3, langue: "Espagnol", niveau: "Intermédiaire" }
          ]);
        }, 500);
        
      } catch (error) {
        console.error("Erreur lors de la récupération des données du CV:", error);
      }
    };
    
    fetchCVData();
  }, [currentUser]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Présent';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  const handleEditProfile = () => {
    setEditMode(true);
  };
  
  const handleSaveProfile = () => {
    setEditMode(false);
    alert("Profil mis à jour avec succès!");
  };
  
  const addExperience = () => {
    const newExperience = {
      id: experiences.length + 1,
      poste: "Nouveau poste",
      entreprise: "Nouvelle entreprise",
      localisation: "Localisation",
      dateDebut: "2023-01",
      dateFin: null,
      description: "Description de votre expérience"
    };
    
    setExperiences([...experiences, newExperience]);
  };
  
  const deleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };
  
  const addFormation = () => {
    const newFormation = {
      id: formations.length + 1,
      diplome: "Nouveau diplôme",
      etablissement: "Nouvel établissement",
      localisation: "Localisation",
      dateDebut: "2022-01",
      dateFin: "2023-01"
    };
    
    setFormations([...formations, newFormation]);
  };
  
  const deleteFormation = (id) => {
    setFormations(formations.filter(form => form.id !== id));
  };
  
  const addCompetence = () => {
    const newCompetence = {
      id: competences.length + 1,
      nom: "Nouvelle compétence",
      niveau: 50
    };
    
    setCompetences([...competences, newCompetence]);
  };
  
  const deleteCompetence = (id) => {
    setCompetences(competences.filter(comp => comp.id !== id));
  };
  
  const addLangue = () => {
    const newLangue = {
      id: langues.length + 1,
      langue: "Nouvelle langue",
      niveau: "Intermédiaire"
    };
    
    setLangues([...langues, newLangue]);
  };
  
  const deleteLangue = (id) => {
    setLangues(langues.filter(langue => langue.id !== id));
  };

  return (
    <div className="dashboard-container">
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
          <div className="notification-icon">
            <span className="notification-badge">2</span>
            <i className="far fa-bell"></i>
          </div>
          <div className="user-avatar">
            {profileData.firstName?.charAt(0) || ''}{profileData.lastName?.charAt(0) || ''}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-heading">PRINCIPAL</h3>
            <ul className="sidebar-menu">
              <li className="sidebar-item">
                <Link to="/candidate-dashboard" className="sidebar-link">
                  <i className="sidebar-icon fas fa-chart-bar"></i>
                  <span>Tableau de bord</span>
                </Link>
              </li>
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
                <Link to="/mon-profil" className="sidebar-link">
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

        <main className="dashboard-main">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-photo">
                <div className="profile-initials">
                  {profileData.firstName?.charAt(0) || ''}{profileData.lastName?.charAt(0) || ''}
                </div>
              </div>
              <div className="profile-title">
                <h1 className="profile-name">{profileData.firstName} {profileData.lastName}</h1>
                <p className="profile-poste">{profileData.headline}</p>
                <p className="profile-localisation">
                  <i className="fas fa-map-marker-alt"></i> {profileData.location}
                </p>
              </div>
              <div className="profile-actions">
                <button className="profile-action-btn download-btn">
                  <i className="fas fa-download"></i>
                  Télécharger CV
                </button>
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

            <div className="profile-nav">
              <button 
                className={`profile-nav-btn ${activeSection === 'infos' ? 'active' : ''}`}
                onClick={() => setActiveSection('infos')}
              >
                <i className="fas fa-user"></i>
                Informations
              </button>
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
              <button 
                className={`profile-nav-btn ${activeSection === 'langues' ? 'active' : ''}`}
                onClick={() => setActiveSection('langues')}
              >
                <i className="fas fa-language"></i>
                Langues
              </button>
            </div>

            <div className="profile-content">
              {activeSection === 'infos' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Informations personnelles</h2>
                    <div>
                      {!editMode ? (
                        <button className="edit-btn" onClick={handleEditProfile}>
                          <i className="fas fa-edit"></i>
                          Modifier
                        </button>
                      ) : (
                        <button className="submit-btn" onClick={handleSaveProfile}>
                          <i className="fas fa-save"></i>
                          Enregistrer
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {editMode ? (
                    <div className="edit-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Prénom</label>
                          <input 
                            type="text" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Nom</label>
                          <input 
                            type="text" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Titre professionnel</label>
                          <input 
                            type="text" 
                            value={profileData.headline}
                            onChange={(e) => setProfileData({...profileData, headline: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Localisation</label>
                          <input 
                            type="text" 
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Email</label>
                          <input 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Téléphone</label>
                          <input 
                            type="tel" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Prénom</span>
                        <span className="info-value">{profileData.firstName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nom</span>
                        <span className="info-value">{profileData.lastName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Titre professionnel</span>
                        <span className="info-value">{profileData.headline}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Localisation</span>
                        <span className="info-value">{profileData.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{profileData.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{profileData.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'experiences' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Expériences professionnelles</h2>
                    <button className="add-btn" onClick={addExperience}>
                      <i className="fas fa-plus"></i>
                      Ajouter une expérience
                    </button>
                  </div>
                  
                  <div className="experiences-list">
                    {experiences.length > 0 ? (
                      experiences.map((exp) => (
                        <div key={exp.id} className="experience-item">
                          <div className="experience-header">
                            <div className="experience-period">
                              {formatDate(exp.dateDebut)} - {formatDate(exp.dateFin)}
                            </div>
                            <div className="experience-actions">
                              <button className="action-icon edit-icon">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="action-icon delete-icon" onClick={() => deleteExperience(exp.id)}>
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
                        <p>Aucune expérience extraite de votre CV</p>
                        <button className="empty-action-btn" onClick={addExperience}>
                          <i className="fas fa-plus"></i>
                          Ajouter une expérience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'formations' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Formation</h2>
                    <button className="add-btn" onClick={addFormation}>
                      <i className="fas fa-plus"></i>
                      Ajouter une formation
                    </button>
                  </div>
                  
                  <div className="formations-list">
                    {formations.length > 0 ? (
                      formations.map((formation) => (
                        <div key={formation.id} className="formation-item">
                          <div className="formation-header">
                            <div className="formation-period">
                              {formatDate(formation.dateDebut)} - {formatDate(formation.dateFin)}
                            </div>
                            <div className="formation-actions">
                              <button className="action-icon edit-icon">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="action-icon delete-icon" onClick={() => deleteFormation(formation.id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <div className="formation-content">
                            <h3 className="formation-diplome">{formation.diplome}</h3>
                            <p className="formation-etablissement">{formation.etablissement} - {formation.localisation}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-graduation-cap empty-icon"></i>
                        <p>Aucune formation extraite de votre CV</p>
                        <button className="empty-action-btn" onClick={addFormation}>
                          <i className="fas fa-plus"></i>
                          Ajouter une formation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'competences' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Compétences</h2>
                    <button className="add-btn" onClick={addCompetence}>
                      <i className="fas fa-plus"></i>
                      Ajouter une compétence
                    </button>
                  </div>
                  
                  <div className="competences-grid">
                    {competences.length > 0 ? (
                      competences.map((competence) => (
                        <div key={competence.id} className="competence-item">
                          <div className="competence-header">
                            <h3 className="competence-nom">{competence.nom}</h3>
                            <div className="competence-actions">
                              <button className="action-icon edit-icon">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="action-icon delete-icon" onClick={() => deleteCompetence(competence.id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <div className="niveau-bar">
                            <div 
                              className="niveau-progress" 
                              style={{ width: `${competence.niveau}%` }}
                            ></div>
                          </div>
                          <div className="niveau-value">{competence.niveau}%</div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-code empty-icon"></i>
                        <p>Aucune compétence extraite de votre CV</p>
                        <button className="empty-action-btn" onClick={addCompetence}>
                          <i className="fas fa-plus"></i>
                          Ajouter une compétence
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'langues' && (
                <div className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Langues</h2>
                    <button className="add-btn" onClick={addLangue}>
                      <i className="fas fa-plus"></i>
                      Ajouter une langue
                    </button>
                  </div>
                  
                  <div className="langues-list">
                    {langues.length > 0 ? (
                      langues.map((langue) => (
                        <div key={langue.id} className="langue-item">
                          <h3 className="langue-nom">{langue.langue}</h3>
                          <div className="langue-actions">
                            <button className="action-icon edit-icon">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-icon delete-icon" onClick={() => deleteLangue(langue.id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                          <span className="langue-niveau">{langue.niveau}</span>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-language empty-icon"></i>
                        <p>Aucune langue extraite de votre CV</p>
                        <button className="empty-action-btn" onClick={addLangue}>
                          <i className="fas fa-plus"></i>
                          Ajouter une langue
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

export default MonProfil;