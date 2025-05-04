import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const InterviewCalendar = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState('interviews');
  const [interviews, setInterviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Charger les entretiens fictifs
  useEffect(() => {
    const mockInterviews = [
      {
        id: 1,
        candidatNom: 'Marie Martin',
        poste: 'UX/UI Designer',
        date: '2025-04-05',
        heure: '14:00',
        matching: 88,
        type: 'Vidéo',
        notes: 'Préparer des questions sur son expérience en recherche utilisateur'
      },
      {
        id: 2,
        candidatNom: 'Sophie Dubois',
        poste: 'Product Owner',
        date: '2025-03-30',
        heure: '10:30',
        matching: 95,
        type: 'Présentiel',
        notes: 'Discuter de son expérience en méthodologie agile'
      },
      {
        id: 3,
        candidatNom: 'Thomas Leroy',
        poste: 'Développeur Backend',
        date: '2025-04-02',
        heure: '15:30',
        matching: 82,
        type: 'Vidéo',
        notes: 'Préparer un test technique sur Node.js'
      }
    ];
    
    setInterviews(mockInterviews);
  }, []);

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    // Générer 14 jours à partir d'aujourd'hui
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Compter les entretiens pour cette date
      const dateString = date.toISOString().split('T')[0];
      const interviewsCount = interviews.filter(interview => interview.date === dateString).length;
      
      days.push({
        date,
        dateString,
        interviewsCount,
        isSelected: date.toDateString() === selectedDate.toDateString()
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Filtrer les entretiens pour la date sélectionnée
  const filteredInterviews = interviews.filter(
    interview => new Date(interview.date).toDateString() === selectedDate.toDateString()
  );

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
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
            <h1 className="dashboard-title">Calendrier des entretiens</h1>
            <div className="dashboard-actions">
              <button className="action-btn">
                <i className="fas fa-plus"></i>
                Ajouter un entretien
              </button>
            </div>
          </div>

          {/* Calendrier */}
          <div className="calendar-container">
            <div className="calendar-days">
              {calendarDays.map((day) => (
                <div 
                  key={day.dateString}
                  className={`calendar-day ${day.isSelected ? 'selected' : ''} ${day.interviewsCount > 0 ? 'has-interviews' : ''}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="day-date">
                    <div className="day-name">{day.date.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                    <div className="day-number">{day.date.getDate()}</div>
                  </div>
                  {day.interviewsCount > 0 && (
                    <div className="interviews-badge">{day.interviewsCount}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="interviews-container">
              <h2 className="interviews-date">
                {formatDate(selectedDate)}
              </h2>
              
              {filteredInterviews.length > 0 ? (
                <div className="interviews-list">
                  {filteredInterviews.map((interview) => (
                    <div key={interview.id} className="interview-card">
                      <div className="interview-time">{interview.heure}</div>
                      <div className="interview-content">
                        <div className="interview-header">
                          <div className="candidate-info">
                            <div className="candidate-avatar">
                              {interview.candidatNom.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="candidate-name">{interview.candidatNom}</h3>
                              <p className="candidate-position">{interview.poste}</p>
                            </div>
                          </div>
                          <div className="interview-type">{interview.type}</div>
                        </div>
                        
                        <div className="interview-details">
                          <div className="interview-matching">
                            <span className="matching-value">{interview.matching}%</span>
                            <span className="matching-label">Matching</span>
                          </div>
                          
                          {interview.notes && (
                            <div className="interview-notes">
                              <i className="fas fa-sticky-note"></i>
                              <p>{interview.notes}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="interview-actions">
                          <button className="action-button">
                            <i className="fas fa-video"></i>
                            <span>Rejoindre</span>
                          </button>
                          <button className="action-button">
                            <i className="fas fa-edit"></i>
                            <span>Modifier</span>
                          </button>
                          <button className="action-button">
                            <i className="fas fa-trash"></i>
                            <span>Annuler</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-interviews">
                  <i className="fas fa-calendar-times no-results-icon"></i>
                  <p>Aucun entretien programmé pour cette date.</p>
                  <button className="action-btn">
                    <i className="fas fa-plus"></i>
                    Ajouter un entretien
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewCalendar;