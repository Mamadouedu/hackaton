import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OffresEmploi = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [offres, setOffres] = useState([]);
  const [filtres, setFiltres] = useState({
    recherche: '',
    localisation: '',
    typeContrat: 'tous',
    experienceMin: 'tous',
    secteur: 'tous'
  });
  const [offresEnregistrees, setOffresEnregistrees] = useState([]);

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

  // Chargement des offres d'emploi depuis Firebase
  useEffect(() => {
    // À remplacer par les appels Firebase
    // Exemple:
    // const fetchJobs = async () => {
    //   try {
    //     // Récupérer les offres d'emploi
    //     const jobsRef = firebase.firestore().collection('jobs').where('status', '==', 'active');
    //     const snapshot = await jobsRef.get();
    //     const fetchedJobs = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     setOffres(fetchedJobs);
    //     
    //     // Récupérer les offres enregistrées par l'utilisateur
    //     if (currentUser) {
    //       const savedJobsRef = firebase.firestore()
    //         .collection('savedJobs')
    //         .where('candidateId', '==', currentUser.uid);
    //       const savedJobsSnapshot = await savedJobsRef.get();
    //       const savedJobIds = savedJobsSnapshot.docs.map(doc => doc.data().jobId);
    //       setOffresEnregistrees(savedJobIds);
    //     }
    //   } catch (error) {
    //     console.error('Erreur lors du chargement des offres:', error);
    //   }
    // };
    // 
    // fetchJobs();
  }, [currentUser]);

  // Gérer les changements de filtres
  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Réinitialiser les filtres
  const resetFiltres = () => {
    setFiltres({
      recherche: '',
      localisation: '',
      typeContrat: 'tous',
      experienceMin: 'tous',
      secteur: 'tous'
    });
  };

  // Filtrer les offres selon les critères
  const offresFiltrees = offres.filter(offre => {
    const matchRecherche = offre.titre?.toLowerCase().includes(filtres.recherche.toLowerCase()) || 
                          offre.entreprise?.toLowerCase().includes(filtres.recherche.toLowerCase()) ||
                          offre.competences?.some(competence => competence.toLowerCase().includes(filtres.recherche.toLowerCase()));
    
    const matchLocalisation = !filtres.localisation || offre.localisation?.toLowerCase().includes(filtres.localisation.toLowerCase());
    
    const matchTypeContrat = filtres.typeContrat === 'tous' || offre.typeContrat === filtres.typeContrat;
    
    const matchExperience = filtres.experienceMin === 'tous' || 
                           (filtres.experienceMin === '0-2' && offre.experienceRequise?.includes('0-2')) ||
                           (filtres.experienceMin === '2-5' && 
                             (offre.experienceRequise?.includes('2-') || 
                              offre.experienceRequise?.includes('3-') ||
                              offre.experienceRequise?.includes('4-'))) ||
                           (filtres.experienceMin === '5+' && offre.experienceRequise?.includes('5+'));
    
    const matchSecteur = filtres.secteur === 'tous' || offre.secteur === filtres.secteur;
    
    return matchRecherche && matchLocalisation && matchTypeContrat && matchExperience && matchSecteur;
  });

  // Basculer une offre comme enregistrée/non-enregistrée
  const toggleOffreEnregistree = async (offerId) => {
    // À remplacer par l'appel Firebase
    // Exemple:
    // try {
    //   if (!currentUser) {
    //     navigate('/login');
    //     return;
    //   }
    //   
    //   if (offresEnregistrees.includes(offerId)) {
    //     // Supprimer de la liste des offres enregistrées
    //     const savedJobRef = firebase.firestore()
    //       .collection('savedJobs')
    //       .where('candidateId', '==', currentUser.uid)
    //       .where('jobId', '==', offerId);
    //     const snapshot = await savedJobRef.get();
    //     
    //     // Supprimer le document
    //     if (!snapshot.empty) {
    //       await snapshot.docs[0].ref.delete();
    //     }
    //     
    //     setOffresEnregistrees(prev => prev.filter(id => id !== offerId));
    //   } else {
    //     // Ajouter à la liste des offres enregistrées
    //     await firebase.firestore().collection('savedJobs').add({
    //       candidateId: currentUser.uid,
    //       jobId: offerId,
    //       savedAt: firebase.firestore.FieldValue.serverTimestamp()
    //     });
    //     
    //     setOffresEnregistrees(prev => [...prev, offerId]);
    //   }
    // } catch (error) {
    //   console.error('Erreur lors de l\'enregistrement de l\'offre:', error);
    // }
    
    // Temporaire (à remplacer par le code Firebase ci-dessus)
    if (offresEnregistrees.includes(offerId)) {
      setOffresEnregistrees(prev => prev.filter(id => id !== offerId));
      alert("Offre retirée de vos favoris");
    } else {
      setOffresEnregistrees(prev => [...prev, offerId]);
      alert("Offre ajoutée à vos favoris");
    }
  };

  // Formater la date de publication
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
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
            JD
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
              <li className="sidebar-item active">
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

        {/* Main offres */}
        <main className="dashboard-main">
          <div className="offres-container">
            {/* Filtres */}
            <div className="filtres-container">
              <h2 className="filtres-title">Recherche d'offres</h2>
              <div className="filtres-form">
                <div className="filtre-group search-group">
                  <input 
                    type="text" 
                    name="recherche" 
                    placeholder="Poste, entreprise, compétence..." 
                    className="filtre-input search-input"
                    value={filtres.recherche}
                    onChange={handleFiltreChange}
                  />
                  <i className="fas fa-search search-icon"></i>
                </div>
                <div className="filtres-row">
                  <div className="filtre-group">
                    <input 
                      type="text" 
                      name="localisation" 
                      placeholder="Ville, région..." 
                      className="filtre-input"
                      value={filtres.localisation}
                      onChange={handleFiltreChange}
                    />
                  </div>
                  <div className="filtre-group">
                    <select 
                      name="typeContrat" 
                      className="filtre-select"
                      value={filtres.typeContrat}
                      onChange={handleFiltreChange}
                    >
                      <option value="tous">Tous les contrats</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Stage">Stage</option>
                      <option value="Alternance">Alternance</option>
                    </select>
                  </div>
                  <div className="filtre-group">
                    <select 
                      name="experienceMin" 
                      className="filtre-select"
                      value={filtres.experienceMin}
                      onChange={handleFiltreChange}
                    >
                      <option value="tous">Toute expérience</option>
                      <option value="0-2">0-2 ans</option>
                      <option value="2-5">2-5 ans</option>
                      <option value="5+">5+ ans</option>
                    </select>
                  </div>
                  <div className="filtre-group">
                    <select 
                      name="secteur" 
                      className="filtre-select"
                      value={filtres.secteur}
                      onChange={handleFiltreChange}
                    >
                      <option value="tous">Tous les secteurs</option>
                      <option value="Informatique">Informatique</option>
                      <option value="Design">Design</option>
                      <option value="Produit">Produit</option>
                      <option value="Data">Data</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                <div className="filtres-actions">
                  <button className="reset-btn" onClick={resetFiltres}>
                    <i className="fas fa-undo"></i>
                    Réinitialiser
                  </button>
                  <button className="save-search-btn">
                    <i className="fas fa-save"></i>
                    Enregistrer cette recherche
                  </button>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="resultats-container">
              <div className="resultats-header">
                <h2 className="resultats-title">
                  {offresFiltrees.length} offre{offresFiltrees.length > 1 ? 's' : ''} trouvée{offresFiltrees.length > 1 ? 's' : ''}
                </h2>
                <div className="resultats-sort">
                  <label>Trier par:</label>
                  <select className="sort-select">
                    <option value="pertinence">Pertinence</option>
                    <option value="date">Date</option>
                    <option value="matching">Taux de matching</option>
                  </select>
                </div>
              </div>

              {/* Liste des offres */}
              <div className="offres-list">
                {offresFiltrees.length > 0 ? (
                  offresFiltrees.map((offre) => (
                    <div key={offre.id} className="offre-card">
                      <div className="offre-header">
                        <div className="entreprise-logo">
                          {offre.logo}
                        </div>
                        <div className="offre-info">
                          <h3 className="offre-titre">{offre.titre}</h3>
                          <p className="offre-entreprise">{offre.entreprise}</p>
                          <p className="offre-localisation">
                            <i className="fas fa-map-marker-alt"></i>
                            {offre.localisation}
                          </p>
                        </div>
                        <div className="offre-matching">
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
                                strokeDasharray={`${2 * Math.PI * 54 * offre.matching / 100} ${2 * Math.PI * 54 * (100 - offre.matching) / 100}`}
                                strokeDashoffset={(2 * Math.PI * 54 * 25) / 100}
                                transform="scale(0.4) translate(75 75)"
                              />
                              <text x="25" y="28" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14px" fontWeight="bold">
                                {offre.matching}%
                              </text>
                            </svg>
                          </div>
                          <span className="matching-label">Matching</span>
                        </div>
                        <button 
                          className={`bookmark-btn ${offresEnregistrees.includes(offre.id) ? 'active' : ''}`}
                          onClick={() => toggleOffreEnregistree(offre.id)}
                        >
                          <i className={`${offresEnregistrees.includes(offre.id) ? 'fas' : 'far'} fa-bookmark`}></i>
                        </button>
                      </div>
                      <div className="offre-body">
                        <div className="offre-details">
                          <span className="offre-tag type-contrat">{offre.typeContrat}</span>
                          <span className="offre-tag experience">{offre.experienceRequise}</span>
                          <span className="offre-tag salaire">{offre.salaire}</span>
                          <span className="offre-date">Publié le {formatDate(offre.datePublication)}</span>
                        </div>
                        <p className="offre-description">{offre.description}</p>
                        <div className="offre-competences">
                          {offre.competences && offre.competences.map((competence, index) => (
                            <span key={index} className="competence-tag">{competence}</span>
                          ))}
                        </div>
                      </div>
                      <div className="offre-actions">
                        <button className="action-button view-btn">
                          <i className="fas fa-eye"></i>
                          <span>Voir détails</span>
                        </button>
                        <button className="action-button apply-btn">
                          <i className="fas fa-paper-plane"></i>
                          <span>Postuler</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-offres">
                    <i className="fas fa-search no-results-icon"></i>
                    <p>Aucune offre ne correspond à votre recherche.</p>
                    <button className="reset-btn" onClick={resetFiltres}>
                      <i className="fas fa-undo"></i>
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OffresEmploi;