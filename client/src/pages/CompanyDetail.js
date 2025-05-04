import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CompanyDetail = () => {
  const { id } = useParams();
  const [stars, setStars] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  
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
  
  // Charger les détails de l'entreprise
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        // Dans une application réelle, ceci serait remplacé par un appel API
        setTimeout(() => {
          // Données fictives pour l'entreprise
          const mockCompany = {
            id,
            name: "TechVision",
            logo: "TV",
            coverImage: null,
            tagline: "Transformer le monde avec la réalité augmentée",
            description: "TechVision est une startup innovante spécialisée dans les technologies de réalité augmentée. Fondée en 2020, notre mission est de transformer la façon dont les utilisateurs interagissent avec le monde numérique. Nous développons des solutions AR pour divers secteurs, notamment la médecine, l'éducation et le commerce de détail.",
            industry: "Technologie",
            location: "Paris, France",
            size: "50-100 employés",
            founded: "2020",
            website: "https://www.techvision.fr",
            values: [
              { title: "Innovation", description: "Nous repoussons constamment les limites de ce qui est possible" },
              { title: "Excellence", description: "Nous visons l'excellence dans tout ce que nous faisons" },
              { title: "Collaboration", description: "Nous croyons que les meilleures idées émergent du travail d'équipe" },
              { title: "Impact", description: "Nous nous efforçons de créer un impact positif sur le monde" }
            ],
            benefits: [
              "Télétravail partiel (3 jours/semaine)",
              "Horaires flexibles",
              "Tickets restaurant",
              "Mutuelle d'entreprise",
              "Budget formation annuel",
              "Équipement de pointe"
            ],
            team: [
              { name: "Alexandre Martin", position: "CEO & Fondateur", photo: null, initials: "AM" },
              { name: "Sophie Durand", position: "CTO", photo: null, initials: "SD" },
              { name: "Thomas Legrand", position: "Directeur R&D", photo: null, initials: "TL" }
            ],
            socialMedia: {
              linkedin: "https://www.linkedin.com/company/techvision",
              twitter: "https://twitter.com/techvision",
              facebook: "https://www.facebook.com/techvision"
            }
          };
          
          setCompany(mockCompany);
          
          // Données fictives pour les offres d'emploi
          const mockJobs = [
            { id: 1, title: "Développeur Full Stack React/Node.js", location: "Paris", type: "CDI", matching: 92 },
            { id: 2, title: "UX/UI Designer", location: "Paris", type: "CDI", matching: 88 },
            { id: 3, title: "Product Owner", location: "Paris", type: "CDI", matching: 85 },
            { id: 4, title: "DevOps Engineer", location: "Remote", type: "CDI", matching: 79 }
          ];
          
          setJobs(mockJobs);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Erreur lors du chargement des données de l'entreprise:", error);
        setLoading(false);
      }
    };
    
    fetchCompanyDetails();
  }, [id]);
  
  return (
    <div className="company-detail-page">
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
      
      <div className="company-detail-container">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Chargement des informations...</p>
          </div>
        ) : company ? (
          <>
            <div className="breadcrumbs">
              <Link to="/">Accueil</Link> &gt; 
              <Link to="/entreprises">Entreprises</Link> &gt; 
              <span>{company.name}</span>
            </div>
            
            {/* En-tête d'entreprise */}
            <div className="company-header">
              <div className="company-cover">
                {company.coverImage ? (
                  <img src={company.coverImage} alt={`${company.name} cover`} className="cover-image" />
                ) : (
                  <div className="cover-placeholder"></div>
                )}
                <div className="company-logo-container">
                  <div className="company-logo large">
                    {company.logo}
                  </div>
                </div>
              </div>
              
              <div className="company-title-section">
                <div className="company-title-info">
                  <h1 className="company-name-large">{company.name}</h1>
                  <p className="company-tagline">{company.tagline}</p>
                  <div className="company-meta">
                    <span className="company-industry">
                      <i className="fas fa-briefcase"></i> {company.industry}
                    </span>
                    <span className="company-location">
                      <i className="fas fa-map-marker-alt"></i> {company.location}
                    </span>
                    <span className="company-size">
                      <i className="fas fa-users"></i> {company.size}
                    </span>
                    <span className="company-founded">
                      <i className="fas fa-calendar"></i> Fondée en {company.founded}
                    </span>
                  </div>
                </div>
                <div className="company-actions">
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="company-website-btn">
                    <i className="fas fa-globe"></i>
                    Site Web
                  </a>
                  <div className="social-buttons">
                    {company.socialMedia.linkedin && (
                      <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    {company.socialMedia.twitter && (
                      <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                    {company.socialMedia.facebook && (
                      <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-btn">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation par onglets */}
            <div className="company-tabs">
              <button 
                className={`company-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-building"></i>
                Présentation
              </button>
              <button 
                className={`company-tab ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                <i className="fas fa-briefcase"></i>
                Offres d'emploi ({jobs.length})
              </button>
              <button 
                className={`company-tab ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                <i className="fas fa-users"></i>
                Équipe
              </button>
              <button 
                className={`company-tab ${activeTab === 'values' ? 'active' : ''}`}
                onClick={() => setActiveTab('values')}
              >
                <i className="fas fa-heart"></i>
                Valeurs
              </button>
            </div>
            
            {/* Contenu des onglets */}
            <div className="company-tab-content">
              {/* Onglet Présentation */}
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <div className="company-description-card">
                    <h2 className="section-title">À propos de {company.name}</h2>
                    <p className="company-description-text">{company.description}</p>
                  </div>
                  
                  <div className="company-benefits-card">
                    <h2 className="section-title">Avantages</h2>
                    <div className="benefits-grid">
                      {company.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                          <div className="benefit-icon">
                            <i className="fas fa-check"></i>
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Offres d'emploi */}
              {activeTab === 'jobs' && (
                <div className="jobs-tab">
                  <h2 className="section-title">Offres d'emploi chez {company.name}</h2>
                  
                  {jobs.length > 0 ? (
                    <div className="jobs-list">
                      {jobs.map(job => (
                        <Link key={job.id} to={`/offres-emploi/${job.id}`} className="job-list-item">
                          <div className="job-list-info">
                            <h3 className="job-list-title">{job.title}</h3>
                            <div className="job-list-details">
                              <span className="job-list-location">
                                <i className="fas fa-map-marker-alt"></i> {job.location}
                              </span>
                              <span className="job-list-type">{job.type}</span>
                            </div>
                          </div>
                          <div className="job-list-right">
                            <div className="matching-badge">{job.matching}%</div>
                            <button className="view-job-btn">
                              <i className="fas fa-arrow-right"></i>
                            </button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="no-jobs">
                      <p>Aucune offre d'emploi disponible actuellement.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Onglet Équipe */}
              {activeTab === 'team' && (
                <div className="team-tab">
                  <h2 className="section-title">L'équipe {company.name}</h2>
                  
                  <div className="team-grid">
                    {company.team.map((member, index) => (
                      <div key={index} className="team-member-card">
                        <div className="member-avatar">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="avatar-img" />
                          ) : (
                            <div className="avatar-initials">{member.initials}</div>
                          )}
                        </div>
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-position">{member.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Onglet Valeurs */}
              {activeTab === 'values' && (
                <div className="values-tab">
                  <h2 className="section-title">Nos valeurs</h2>
                  
                  <div className="values-grid">
                    {company.values.map((value, index) => (
                      <div key={index} className="value-card">
                        <h3 className="value-title">{value.title}</h3>
                        <p className="value-description">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Call-to-action */}
            <div className="company-cta">
              <div className="cta-content">
                <h2 className="cta-title">Intéressé(e) par {company.name}?</h2>
                <p className="cta-subtitle">Explorez nos offres d'emploi et rejoignez une équipe passionnée.</p>
                <button 
                  className="cta-button" 
                  onClick={() => setActiveTab('jobs')}
                >
                  Voir les offres disponibles
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Entreprise non trouvée</h2>
            <p>Cette entreprise n'existe pas ou a été supprimée.</p>
            <Link to="/entreprises" className="back-btn">
              <i className="fas fa-arrow-left"></i>
              Retour aux entreprises
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;