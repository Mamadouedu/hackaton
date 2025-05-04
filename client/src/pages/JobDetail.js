import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const JobDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);
  
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
  
  // Charger les détails de l'offre d'emploi
  useEffect(() => {
    // Simulation d'appel API pour charger les détails de l'offre
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        // Dans une application réelle, ceci serait remplacé par un appel API
        // Par exemple: const response = await api.getJobById(id);
        
        // Simuler un délai de chargement
        setTimeout(() => {
          const mockJob = {
            id,
            title: "Développeur Full Stack React/Node.js",
            company: "TechVision",
            companyLogo: "TV",
            location: "Paris, France",
            type: "CDI",
            category: "Tech",
            experience: "3-5 ans",
            salary: "55k€ - 65k€",
            matching: 92,
            postedAt: "2025-03-15T10:00:00",
            description: "TechVision recherche un développeur Full Stack talentueux pour rejoindre notre équipe en pleine croissance. Vous travaillerez sur des projets innovants dans le domaine de la réalité augmentée.",
            missionsList: [
              "Développer et maintenir des applications web utilisant React.js et Node.js",
              "Collaborer avec les designers UX/UI pour implémenter des interfaces utilisateur intuitives",
              "Participer aux code reviews et assurer la qualité du code",
              "Optimiser les applications pour la performance et l'évolutivité",
              "Participer à la conception d'architecture technique"
            ],
            profileList: [
              "3-5 ans d'expérience en développement web Full Stack",
              "Maîtrise de JavaScript, React.js, Node.js, et Express",
              "Expérience avec MongoDB ou d'autres bases de données NoSQL",
              "Connaissance des bonnes pratiques de développement et des design patterns",
              "Familiarité avec les méthodologies Agile/Scrum",
              "Capacité à résoudre des problèmes complexes de manière autonome"
            ],
            benefitsList: [
              "Télétravail partiel (3 jours/semaine)",
              "Horaires flexibles",
              "Tickets restaurant",
              "Mutuelle d'entreprise",
              "Budget formation annuel",
              "Équipement de pointe"
            ],
            applicationProcess: "Après avoir postulé, vous serez contacté par notre équipe RH pour un premier entretien téléphonique. Ensuite, vous aurez un test technique à réaliser, suivi d'un entretien avec l'équipe technique et le CTO.",
            companyDescription: "TechVision est une startup innovante spécialisée dans les technologies de réalité augmentée. Fondée en 2020, notre mission est de transformer la façon dont les utilisateurs interagissent avec le monde numérique. Nous développons des solutions AR pour divers secteurs, notamment la médecine, l'éducation et le commerce de détail.",
            companyValues: ["Innovation", "Excellence", "Collaboration", "Impact"],
            companySize: "50-100 employés",
            companyWebsite: "https://www.techvision.fr"
          };
          
          setJob(mockJob);
          
          // Simuler des offres similaires
          const mockSimilarJobs = [
            { id: 101, title: "Développeur Frontend React", company: "DigitalSoft", location: "Paris", matching: 85 },
            { id: 102, title: "Développeur Backend Node.js", company: "WebPro", location: "Lyon", matching: 80 },
            { id: 103, title: "Ingénieur Full Stack JavaScript", company: "AppMakers", location: "Bordeaux", matching: 78 }
          ];
          
          setSimilarJobs(mockSimilarJobs);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Erreur lors du chargement de l'offre:", error);
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);
  
  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
    // Dans une app réelle, ajouter/supprimer l'offre des favoris dans la base de données
  };
  const handleSubmitApplication = () => {
    // Simuler un délai pour l'envoi
    setTimeout(() => {
      setApplicationSubmitted(true);
      setTimeout(() => {
        setShowApplyModal(false);
        alert("Votre candidature a été envoyée avec succès!");
      }, 1500);
    }, 1000);
  };
  
  const handleApply = () => {
    if (currentUser) {
      setShowApplyModal(true);
    } else {
      // Rediriger vers la page de connexion
      // Vous pourriez utiliser Navigate de react-router-dom ici
      window.location.href = "/login";
    }
  };
  
  // Formater la date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="job-detail-page">
      <Navbar />
      
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
      
      <div className="job-detail-container">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Chargement de l'offre...</p>
          </div>
        ) : job ? (
          <>
            <div className="breadcrumbs">
              <Link to="/">Accueil</Link> &gt; 
              <Link to="/offres-emploi">Offres d'emploi</Link> &gt; 
              <Link to={`/offres-emploi?category=${job.category}`}>{job.category}</Link> &gt; 
              <span>{job.title}</span>
            </div>
            
            <div className="job-header">
              <div className="job-header-left">
                <div className="company-logo">
                  {job.companyLogo}
                </div>
                <div className="job-title-container">
                  <h1 className="job-title">{job.title}</h1>
                  <div className="company-info">
                    <Link to={`/entreprises/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="company-name">
                      {job.company}
                    </Link>
                    <div className="job-location">
                      <i className="fas fa-map-marker-alt"></i> {job.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="job-header-right">
                <div className="matching-score">
                  <div className="matching-circle">
                    <svg width="80" height="80" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a40" strokeWidth="12" />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="#8c52ff" 
                        strokeWidth="12" 
                        strokeDasharray={`${2 * Math.PI * 54 * job.matching / 100} ${2 * Math.PI * 54 * (100 - job.matching) / 100}`}
                        strokeDashoffset={(2 * Math.PI * 54 * 25) / 100}
                      />
                      <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="24px" fontWeight="bold">
                        {job.matching}%
                      </text>
                    </svg>
                  </div>
                  <span className="matching-label">Match avec votre profil</span>
                </div>
              </div>
            </div>
            
            <div className="job-content">
              <div className="job-main">
                <div className="job-details-card">
                  <div className="job-tags">
                    <span className="job-tag">{job.type}</span>
                    <span className="job-tag">{job.experience}</span>
                    <span className="job-tag">{job.salary}</span>
                    <span className="job-posted">Publiée le {formatDate(job.postedAt)}</span>
                  </div>
                  
                  <div className="job-actions">
                    <button className="action-btn apply-btn" onClick={handleApply}>
                      <i className="fas fa-paper-plane"></i>
                      Postuler
                    </button>
                    <button 
                      className={`action-btn save-btn ${isSaved ? 'saved' : ''}`} 
                      onClick={toggleSaveJob}
                    >
                      <i className={`${isSaved ? 'fas' : 'far'} fa-heart`}></i>
                      {isSaved ? 'Sauvegardée' : 'Sauvegarder'}
                    </button>
                  </div>
                  
                  <div className="job-description">
                    <h2 className="section-title">Description du poste</h2>
                    <p>{job.description}</p>
                  </div>
                  
                  <div className="job-missions">
                    <h2 className="section-title">Missions</h2>
                    <ul className="missions-list">
                      {job.missionsList.map((mission, index) => (
                        <li key={index}>{mission}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="job-profile">
                    <h2 className="section-title">Profil recherché</h2>
                    <ul className="profile-list">
                      {job.profileList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="job-benefits">
                    <h2 className="section-title">Avantages</h2>
                    <div className="benefits-grid">
                      {job.benefitsList.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <div className="benefit-icon">
                            <i className="fas fa-check"></i>
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="job-process">
                    <h2 className="section-title">Processus de recrutement</h2>
                    <p>{job.applicationProcess}</p>
                  </div>
                </div>
                
                <div className="company-profile-card">
                  <h2 className="section-title">À propos de {job.company}</h2>
                  <p className="company-description">{job.companyDescription}</p>
                  
                  <div className="company-values">
                    <h3>Nos valeurs</h3>
                    <div className="values-list">
                      {job.companyValues.map((value, index) => (
                        <span key={index} className="value-tag">{value}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="company-details">
                    <div className="detail-item">
                      <i className="fas fa-users"></i>
                      <span>{job.companySize}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-globe"></i>
                      <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                        {job.companyWebsite.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  </div>
                  
                  <Link to={`/entreprises/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="view-company-btn">
                    Voir le profil complet
                  </Link>
                </div>
              </div>
              
              <div className="job-sidebar">
                <div className="similar-jobs-card">
                  <h2 className="card-title">Offres similaires</h2>
                  <div className="similar-jobs-list">
                    {similarJobs.map(job => (
                      <Link key={job.id} to={`/offres-emploi/${job.id}`} className="similar-job-item">
                        <div className="similar-job-info">
                          <h3 className="similar-job-title">{job.title}</h3>
                          <p className="similar-job-company">{job.company}</p>
                          <p className="similar-job-location">
                            <i className="fas fa-map-marker-alt"></i> {job.location}
                          </p>
                        </div>
                        <div className="similar-job-matching">
                          <div className="matching-badge small">{job.matching}%</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="apply-card">
                  <h2 className="card-title">Intéressé(e) par ce poste?</h2>
                  <p>Postulez dès maintenant et obtenez une réponse rapide.</p>
                  <button className="apply-btn-sidebar" onClick={handleApply}>
                    <i className="fas fa-paper-plane"></i>
                    Postuler maintenant
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modal de candidature */}
            {showApplyModal && (
              <div className="modal-overlay">
                <div className="apply-modal">
                  <div className="modal-header">
                    <h2>Postuler pour {job.title}</h2>
                    <button className="close-modal" onClick={() => setShowApplyModal(false)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="apply-form">
                      <div className="form-group">
                        <label>Lettre de motivation</label>
                        <textarea 
                          rows="6" 
                          placeholder="Décrivez pourquoi vous êtes intéressé(e) par ce poste et pourquoi vous seriez un bon candidat..."
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>CV</label>
                        <div className="file-upload">
                          <input type="file" id="cv-upload" className="hidden-input" />
                          <label htmlFor="cv-upload" className="upload-btn">
                            <i className="fas fa-upload"></i>
                            <span>Télécharger votre CV</span>
                          </label>
                        </div>
                        <p className="cv-note">ou utiliser le CV de votre profil</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="cancel-btn" onClick={() => setShowApplyModal(false)}>Annuler</button>
                    <button className="submit-btn" onClick={handleSubmitApplication}>
                      {applicationSubmitted ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Offre non trouvée</h2>
            <p>Cette offre d'emploi n'existe pas ou a été supprimée.</p>
            <Link to="/offres-emploi" className="back-btn">
              <i className="fas fa-arrow-left"></i>
              Retour aux offres d'emploi
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;