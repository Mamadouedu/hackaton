import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MesCandidatures = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
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

  // Charger les candidatures depuis Firebase
  useEffect(() => {
    // À remplacer par les appels Firebase
    // Exemple:
    // const fetchApplications = async () => {
    //   if (!currentUser) return;
    //   
    //   try {
    //     const applicationsRef = firebase.firestore()
    //       .collection('applications')
    //       .where('candidateId', '==', currentUser.uid)
    //       .orderBy('datePostulation', 'desc');
    //     
    //     const snapshot = await applicationsRef.get();
    //     const applicationsList = [];
    //     
    //     for (const doc of snapshot.docs) {
    //       const application = {
    //         id: doc.id,
    //         ...doc.data()
    //       };
    //       
    //       // Récupérer les infos de l'offre associée
    //       if (application.jobId) {
    //         const jobDoc = await firebase.firestore()
    //           .collection('jobs')
    //           .doc(application.jobId)
    //           .get();
    //         
    //         if (jobDoc.exists) {
    //           application.poste = jobDoc.data().titre;
    //           application.entreprise = jobDoc.data().entreprise;
    //           application.logo = jobDoc.data().logo;
    //         }
    //       }
    //       
    //       applicationsList.push(application);
    //     }
    //     
    //     setCandidatures(applicationsList);
    //   } catch (error) {
    //     console.error('Erreur lors du chargement des candidatures:', error);
    //   }
    // };
    // 
    // fetchApplications();
  }, [currentUser]);

  // Filtrer les candidatures selon le statut et la recherche
  const candidaturesFiltrees = candidatures.filter(candidature => {
    const matchStatut = filtreStatut === 'tous' || candidature.statut === filtreStatut;
    const matchRecherche = candidature.poste?.toLowerCase().includes(recherche.toLowerCase()) || 
                          candidature.entreprise?.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchRecherche;
  });

  // Obtenir la couleur du statut
  const getStatutColor = (statut) => {
    switch(statut) {
      case 'envoyée': return '#8c52ff';
      case 'en_cours': return '#3498db';
      case 'entretien': return '#f39c12';
      case 'acceptée': return '#2ecc71';
      case 'rejetée': return '#e74c3c';
      default: return '#8c52ff';
    }
  };

  // Formater le statut pour l'affichage
  const formatStatut = (statut) => {
    switch(statut) {
      case 'envoyée': return 'Candidature envoyée';
      case 'en_cours': return 'En cours d\'examen';
      case 'entretien': return 'Entretien programmé';
      case 'acceptée': return 'Candidature acceptée';
      case 'rejetée': return 'Candidature refusée';
      default: return statut;
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
              <span className="notification-badge">3</span>
              <i className="far fa-bell"></i>
            </div>
          </div>
          <div className="user-avatar">
            {currentUser?.profile?.firstName?.charAt(0) || 'J'}{currentUser?.profile?.lastName?.charAt(0) || 'D'}
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
              <li className="sidebar-item active">
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
              <li className="sidebar-item">
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

        {/* Main candidatures */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Mes candidatures</h1>
            <div className="dashboard-actions">
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Rechercher..." 
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <div className="filter-container">
                <select 
                  className="filter-select"
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="envoyée">Candidature envoyée</option>
                  <option value="en_cours">En cours d'examen</option>
                  <option value="entretien">Entretien programmé</option>
                  <option value="acceptée">Acceptée</option>
                  <option value="rejetée">Refusée</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidatures list */}
          <div className="candidatures-list">
            {candidaturesFiltrees.length > 0 ? (
              candidaturesFiltrees.map((candidature) => (
                <div key={candidature.id} className="candidature-card">
                  <div className="candidature-header">
                    <div className="entreprise-logo">
                      {candidature.logo}
                    </div>
                    <div className="candidature-info">
                      <h3 className="candidature-poste">{candidature.poste}</h3>
                      <p className="candidature-entreprise">{candidature.entreprise}</p>
                    </div>
                    <div className="candidature-matching">
                      <div className="matching-circle">
                        <svg width="50" height="50" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a40" strokeWidth="12" transform="scale(0.4) translate(75 75)" />
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="54" 
                            fill="none" 
                            stroke="#8c52ff" 
                            strokeWidth="12" 
                            strokeDasharray={`${2 * Math.PI * 54 * candidature.matching / 100} ${2 * Math.PI * 54 * (100 - candidature.matching) / 100}`}
                            strokeDashoffset={(2 * Math.PI * 54 * 25) / 100}
                            transform="scale(0.4) translate(75 75)"
                          />
                          <text x="25" y="28" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14px" fontWeight="bold">
                            {candidature.matching}%
                          </text>
                        </svg>
                      </div>
                      <span className="matching-label">Matching</span>
                    </div>
                  </div>
                  <div className="candidature-body">
                    <div className="candidature-dates">
                      <div className="date-item">
                        <span className="date-label">Postulé le:</span>
                        <span className="date-value">{candidature.datePostulation ? new Date(candidature.datePostulation).toLocaleDateString('fr-FR') : ''}</span>
                      </div>
                      <div className="date-item">
                        <span className="date-label">Dernier contact:</span>
                        <span className="date-value">{candidature.dernierContact ? new Date(candidature.dernierContact).toLocaleDateString('fr-FR') : ''}</span>
                      </div>
                    </div>
                    <div className="candidature-statut" style={{ backgroundColor: getStatutColor(candidature.statut) }}>
                      {formatStatut(candidature.statut)}
                    </div>
                  </div>
                  {candidature.notes && (
                    <div className="candidature-notes">
                      <i className="fas fa-sticky-note note-icon"></i>
                      <p className="note-text">{candidature.notes}</p>
                    </div>
                  )}
                  <div className="candidature-actions">
                    <button className="action-button view-btn">
                      <i className="fas fa-eye"></i>
                      <span>Voir détails</span>
                    </button>
                    {candidature.statut !== 'rejetée' && candidature.statut !== 'acceptée' && (
                      <button className="action-button relance-btn">
                        <i className="fas fa-paper-plane"></i>
                        <span>Relancer</span>
                      </button>
                    )}
                    <button className="action-button note-btn">
                      <i className="fas fa-edit"></i>
                      <span>Ajouter note</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-candidatures">
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

export default MesCandidatures;