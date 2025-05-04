import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationsMenu from '../components/NotificationsMenu';
import ProfileMenu from '../components/ProfileMenu';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [stars, setStars] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // États à remplir avec des données Firebase
  const [notifications, setNotifications] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    activeJobs: {
      count: 0,
      change: 0,
      period: 'cette semaine'
    },
    applications: {
      count: 0,
      change: 0,
      period: 'aujourd\'hui'
    },
    matchingRate: {
      value: 0,
      change: 0,
      period: 'ce mois'
    },
    unreadMessages: {
      count: 0,
      change: 0,
      period: 'nouveaux'
    }
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

  // Chargement des données du dashboard depuis Firebase
  useEffect(() => {
    // À remplacer par les appels Firebase
    // Exemple:
    // const fetchDashboardData = async () => {
    //   if (!currentUser) return;
    //   
    //   // Récupérer les offres actives
    //   const jobsRef = firebase.firestore()
    //     .collection('jobs')
    //     .where('recruiterId', '==', currentUser.uid)
    //     .where('status', '==', 'active');
    //   const jobsSnapshot = await jobsRef.get();
    //   const jobsCount = jobsSnapshot.size;
    //   
    //   // Récupérer les candidatures
    //   const applicationsRef = firebase.firestore()
    //     .collection('applications')
    //     .where('recruiterId', '==', currentUser.uid);
    //   const applicationsSnapshot = await applicationsRef.get();
    //   const applicationsCount = applicationsSnapshot.size;
    //   
    //   // Récupérer les messages non lus
    //   const messagesRef = firebase.firestore()
    //     .collection('messages')
    //     .where('recipientId', '==', currentUser.uid)
    //     .where('read', '==', false);
    //   const messagesSnapshot = await messagesRef.get();
    //   const messagesCount = messagesSnapshot.size;
    //   
    //   // Récupérer le taux de matching
    //   const matchingRate = 85; // À calculer en fonction des embauches réussies
    //   
    //   setDashboardData({
    //     activeJobs: {
    //       count: jobsCount,
    //       change: 0,
    //       period: 'cette semaine'
    //     },
    //     applications: {
    //       count: applicationsCount,
    //       change: 0,
    //       period: 'aujourd\'hui'
    //     },
    //     matchingRate: {
    //       value: matchingRate,
    //       change: 0,
    //       period: 'ce mois'
    //     },
    //     unreadMessages: {
    //       count: messagesCount,
    //       change: 0,
    //       period: 'nouveaux'
    //     }
    //   });
    //   
    //   // Récupérer les notifications
    //   const notificationsRef = firebase.firestore()
    //     .collection('notifications')
    //     .where('userId', '==', currentUser.uid)
    //     .orderBy('timestamp', 'desc')
    //     .limit(10);
    //   const notificationsSnapshot = await notificationsRef.get();
    //   const notificationsList = notificationsSnapshot.docs.map(doc => ({
    //     id: doc.id,
    //     ...doc.data()
    //   }));
    //   setNotifications(notificationsList);
    // };
    // 
    // fetchDashboardData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Fermer les menus si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
      if (showProfileMenu && !event.target.closest('.profile-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showProfileMenu]);

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
          <div className="notifications-container">
            <div 
              className="notification-icon" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              <i className="far fa-bell"></i>
            </div>
            {showNotifications && (
              <NotificationsMenu 
                notifications={notifications} 
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
          <div className="profile-container">
            <div 
              className="user-avatar" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {currentUser?.profile?.fullName?.split(' ').map(n => n[0]).join('') || 'MD'}
            </div>
            {showProfileMenu && (
              <ProfileMenu 
                user={currentUser} 
                onLogout={handleLogout}
              />
            )}
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

        {/* Main dashboard */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Tableau de bord</h1>
            <div className="dashboard-actions">
              <button className="action-btn reports-btn">
                <i className="fas fa-chart-bar"></i>
                Rapports
              </button>
              <Link to="/new-job-offer" className="action-btn new-job-btn">
                <i className="fas fa-plus"></i>
                Nouvelle offre
              </Link>
            </div>
          </div>

          {/* Dashboard cards */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Offres actives</h3>
                <div className="card-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="card-value">{dashboardData.activeJobs.count}</div>
                <div className="card-change">
                  <i className="fas fa-arrow-right"></i> {dashboardData.activeJobs.period}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Candidatures</h3>
                <div className="card-icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="card-value">{dashboardData.applications.count}</div>
                <div className="card-change">
                  <i className="fas fa-arrow-right"></i> {dashboardData.applications.period}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Taux de matching</h3>
                <div className="card-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="card-value">{dashboardData.matchingRate.value}%</div>
                <div className="card-change">
                  <i className="fas fa-arrow-right"></i> {dashboardData.matchingRate.period}
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">Messages non lus</h3>
                <div className="card-icon">
                  <i className="fas fa-comment-alt"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="card-value">{dashboardData.unreadMessages.count}</div>
                <div className="card-change">
                  <i className="fas fa-arrow-right"></i> {dashboardData.unreadMessages.period}
                </div>
              </div>
            </div>
          </div>

          {/* Message de bienvenue pour les nouveaux recruteurs */}
          <div className="welcome-message" style={{
            backgroundColor: 'rgba(33, 33, 49, 0.8)',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{marginBottom: '1rem', color: '#8c52ff'}}>Bienvenue sur votre tableau de bord TalentMatch!</h2>
            <p style={{marginBottom: '1.5rem', lineHeight: '1.6', color: '#e0e0e0'}}>
              Commencez à publier des offres d'emploi pour trouver les meilleurs talents grâce à notre algorithme de matching intelligent.
            </p>
            <Link to="/new-job-offer" className="action-btn new-job-btn" style={{marginTop: '1rem', display: 'inline-flex'}}>
              <i className="fas fa-plus"></i>
              Créer ma première offre
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;