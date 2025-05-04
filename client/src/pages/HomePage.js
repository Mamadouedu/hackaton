import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MatchingRateCircle from '../components/MatchingRateCircle';

const HomePage = () => {
  const [stars, setStars] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobCategories] = useState([
    { id: 'tech', name: 'Tech', icon: '💻', count: 1245 },
    { id: 'marketing', name: 'Marketing', icon: '📊', count: 842 },
    { id: 'design', name: 'Design', icon: '🎨', count: 567 },
    { id: 'sales', name: 'Commercial', icon: '🤝', count: 689 },
    { id: 'hr', name: 'RH', icon: '👥', count: 432 },
    { id: 'finance', name: 'Finance', icon: '💰', count: 321 },
    { id: 'legal', name: 'Juridique', icon: '⚖️', count: 156 },
  ]);
  const [featuredCompanies] = useState([
    { id: 1, name: 'TechVision', logo: 'TV', sector: 'Tech', jobs: 12, description: 'Startup innovante dans le domaine de la réalité augmentée' },
    { id: 2, name: 'DigiMarketing', logo: 'DM', sector: 'Marketing', jobs: 8, description: 'Agence marketing digitale spécialisée en growth hacking' },
    { id: 3, name: 'DesignFusion', logo: 'DF', sector: 'Design', jobs: 5, description: 'Studio de design primé créant des expériences utilisateur exceptionnelles' },
    { id: 4, name: 'SalesPro', logo: 'SP', sector: 'Commercial', jobs: 9, description: 'Leader en solutions de vente pour les entreprises du CAC 40' },
  ]);
  const [trendingJobs] = useState([
    { id: 1, title: 'Développeur Full Stack', company: 'TechVision', location: 'Paris', type: 'CDI', matching: 92 },
    { id: 2, title: 'UX/UI Designer', company: 'DesignFusion', location: 'Lyon', type: 'CDI', matching: 88 },
    { id: 3, title: 'Growth Hacker', company: 'DigiMarketing', location: 'Bordeaux', type: 'CDD', matching: 85 },
    { id: 4, title: 'Business Developer', company: 'SalesPro', location: 'Lille', type: 'CDI', matching: 90 },
  ]);
  const [testimonials] = useState([
    { id: 1, name: 'Sophie D.', position: 'UX Designer chez DesignFusion', photo: null, initials: 'SD', text: 'TalentMatch m\'a permis de trouver un emploi qui correspond parfaitement à mes compétences et à mes aspirations. Le système de matching est incroyablement précis !' },
    { id: 2, name: 'Thomas L.', position: 'Développeur Backend chez TechVision', photo: null, initials: 'TL', text: 'Grâce à TalentMatch, j\'ai économisé beaucoup de temps dans ma recherche d\'emploi. La plateforme m\'a directement mis en relation avec les entreprises qui correspondaient à mon profil.' },
  ]);
  const [articles] = useState([
    { id: 1, title: 'Comment optimiser son CV pour l\'IA de recrutement', category: 'Conseils', imageUrl: null, minRead: 5 },
    { id: 2, title: 'Les 10 compétences tech les plus recherchées en 2025', category: 'Tendances', imageUrl: null, minRead: 8 },
    { id: 3, title: 'Comment réussir un entretien à distance', category: 'Conseils', imageUrl: null, minRead: 6 },
  ]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    // Rediriger vers la page de recherche avec les paramètres
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="homepage-container">
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
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Trouvez le job qui vous <span className="highlight">correspond vraiment</span></h1>
          <p className="hero-subtitle">TalentMatch utilise l'intelligence artificielle pour vous connecter avec les opportunités professionnelles qui correspondent à vos compétences et aspirations.</p>
          
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <i className="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Poste, entreprise ou mot-clé..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="search-button">
                Rechercher
              </button>
            </form>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">15,000+</span>
              <span className="stat-label">Offres d'emploi</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2,500+</span>
              <span className="stat-label">Entreprises</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">94%</span>
              <span className="stat-label">Taux de satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="matching-illustration">
            <MatchingRateCircle initialRate={88} maxRate={88} animated={false} />
            <div className="matching-text">
              <span className="matching-label">Taux de matching moyen</span>
              <span className="matching-value">Notre IA trouve les meilleurs matchs</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Explorez par catégorie</h2>
          <p className="section-subtitle">Découvrez les offres d'emploi dans votre domaine d'expertise</p>
        </div>
        
        <div className="categories-tabs">
          <button 
            className={`category-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tous
          </button>
          {jobCategories.slice(0, 6).map(category => (
            <button 
              key={category.id}
              className={`category-tab ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
          <button className="category-tab more-tab">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
        
        <div className="categories-grid">
          {jobCategories.map(category => (
            <Link key={category.id} to={`/offres-emploi?category=${category.id}`} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <span className="category-count">{category.count} offres</span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Companies Section */}
      <section className="companies-section">
        <div className="section-header">
          <h2 className="section-title">Entreprises qui recrutent</h2>
          <Link to="/entreprises" className="view-all-link">
            Voir toutes <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="company-cards-grid">
          <div className="company-card-wrapper">
            <div className="company-logo-box tv">
              <span>TV</span>
            </div>
            <div className="company-details">
              <h3 className="company-name">TechVision</h3>
              <span className="company-tag">Tech</span>
              <p className="company-description">Startup innovante dans le domaine de la réalité augmentée</p>
              <div className="company-domaine">
                <span>Domaine de la réalité augmentée</span>
              </div>
              <span className="company-jobs">12 offres d'emploi</span>
            </div>
          </div>
          
          <div className="company-card-wrapper">
            <div className="company-logo-box dm">
              <span>DM</span>
            </div>
            <div className="company-details">
              <h3 className="company-name">DigiMarketing</h3>
              <span className="company-tag">Marketing</span>
              <p className="company-description">Agence marketing digitale spécialisée en growth hacking</p>
              <div className="company-domaine">
                <span>Growth hacking</span>
              </div>
              <span className="company-jobs">8 offres d'emploi</span>
            </div>
          </div>
          
          <div className="company-card-wrapper">
            <div className="company-logo-box df">
              <span>DF</span>
            </div>
            <div className="company-details">
              <h3 className="company-name">DesignFusion</h3>
              <span className="company-tag">Design</span>
              <p className="company-description">Studio de design primé créant des expériences utilisateur exceptionnelles</p>
              <div className="company-domaine">
                <span>Expériences utilisateur</span>
              </div>
              <span className="company-jobs">5 offres d'emploi</span>
            </div>
          </div>
          
          <div className="company-card-wrapper">
            <div className="company-logo-box sp">
              <span>SP</span>
            </div>
            <div className="company-details">
              <h3 className="company-name">SalesPro</h3>
              <span className="company-tag">Commercial</span>
              <p className="company-description">Leader en solutions de vente pour les entreprises du CAC 40</p>
              <div className="company-domaine">
                <span>Solutions de vente</span>
              </div>
              <span className="company-jobs">9 offres d'emploi</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Jobs Section */}
      <section className="trending-jobs-section">
        <div className="section-header">
          <h2 className="section-title">Offres populaires</h2>
          <Link to="/offres-emploi" className="view-all-link">
            Voir toutes <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="jobs-grid">
          {trendingJobs.map(job => (
            <Link key={job.id} to={`/offres-emploi/${job.id}`} className="job-card">
              <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-company">{job.company}</div>
              </div>
              <div className="job-details">
                <span className="job-location">
                  <i className="fas fa-map-marker-alt"></i> {job.location}
                </span>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-matching">
                <div className="matching-badge">{job.matching}%</div>
                <span>Match avec votre profil</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">Comment ça fonctionne</h2>
          <p className="section-subtitle">TalentMatch utilise l'IA pour vous connecter avec les meilleures opportunités</p>
        </div>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3 className="step-title">Créez votre profil</h3>
            <p className="step-description">Importez votre CV ou connectez votre compte LinkedIn pour créer rapidement votre profil professionnel.</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="step-title">L'IA analyse votre profil</h3>
            <p className="step-description">Notre algorithme analyse plus de 50 critères pour déterminer vos compétences et aspirations.</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3 className="step-title">Découvrez vos matches</h3>
            <p className="step-description">Recevez des recommandations d'offres d'emploi personnalisées avec un score de matching précis.</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="step-title">Postulez et suivez</h3>
            <p className="step-description">Postulez en quelques clics et suivez l'évolution de vos candidatures en temps réel.</p>
          </div>
        </div>
        
        <div className="cta-container">
          <Link to="/candidate-signup" className="cta-button">
            Créer mon profil gratuitement
          </Link>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Ce que disent nos utilisateurs</h2>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.photo ? (
                    <img src={testimonial.photo} alt={testimonial.name} />
                  ) : (
                    <div className="avatar-initials">{testimonial.initials}</div>
                  )}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-position">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="blog-section">
        <div className="section-header">
          <h2 className="section-title">Articles & Conseils</h2>
          <Link to="/conseils" className="view-all-link">
            Voir tous <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="articles-grid">
          {articles.map(article => (
            <Link key={article.id} to={`/conseils/${article.id}`} className="article-card">
              <div className="article-image">
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} />
                ) : (
                  <div className="placeholder-image">
                    <i className="fas fa-newspaper"></i>
                  </div>
                )}
              </div>
              <div className="article-content">
                <span className="article-category">{article.category}</span>
                <h3 className="article-title">{article.title}</h3>
                <span className="article-meta">{article.minRead} min de lecture</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Prêt à trouver votre prochain emploi ?</h2>
          <p className="cta-subtitle">Rejoignez les milliers de professionnels qui ont trouvé leur emploi idéal grâce à TalentMatch</p>
          <div className="cta-buttons">
            <Link to="/candidate-signup" className="cta-button primary">
              Je cherche un emploi
            </Link>
            <Link to="/recruiter-signup" className="cta-button secondary">
              Je recrute des talents
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo">
              <div className="logo-icon">TM</div>
              <span>TalentMatch</span>
            </div>
            <p className="footer-tagline">Trouvez le job qui vous correspond vraiment</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Candidats</h3>
              <ul className="footer-menu">
                <li><Link to="/offres-emploi">Offres d'emploi</Link></li>
                <li><Link to="/entreprises">Entreprises</Link></li>
                <li><Link to="/conseils/cv">Conseils CV</Link></li>
                <li><Link to="/conseils/entretien">Préparer un entretien</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Recruteurs</h3>
              <ul className="footer-menu">
                <li><Link to="/recruiter-signup">Publier une offre</Link></li>
                <li><Link to="/pricing">Tarifs</Link></li>
                <li><Link to="/solutions-rh">Solutions RH</Link></li>
                <li><Link to="/demo">Demander une démo</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">TalentMatch</h3>
              <ul className="footer-menu">
                <li><Link to="/about">À propos</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/careers">Nous rejoindre</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Légal</h3>
              <ul className="footer-menu">
                <li><Link to="/cgu">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy">Politique de confidentialité</Link></li>
                <li><Link to="/cookies">Gestion des cookies</Link></li>
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <a href="https://twitter.com/talentmatch" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/talentmatch" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.facebook.com/talentmatch" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/talentmatch" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} TalentMatch. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;