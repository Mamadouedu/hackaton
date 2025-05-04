import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenu = ({ user, onLogout }) => {
  return (
    <div className="profile-menu">
      <div className="profile-menu-header">
        <div className="profile-avatar">
          {user?.profile?.photo ? (
            <img src={user.profile.photo} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-initials">
              {user?.type === 'recruiter' 
                ? user?.profile?.fullName?.split(' ').map(n => n[0]).join('') || 'MD'
                : `${user?.profile?.firstName?.charAt(0) || 'J'}${user?.profile?.lastName?.charAt(0) || 'D'}`
              }
            </div>
          )}
        </div>
        <div className="profile-info">
          <h3 className="profile-name">
            {user?.type === 'recruiter' 
              ? user?.profile?.fullName || 'Nom du recruteur'
              : `${user?.profile?.firstName || 'Prénom'} ${user?.profile?.lastName || 'Nom'}`
            }
          </h3>
          <p className="profile-email">{user?.email || 'email@example.com'}</p>
        </div>
      </div>
      
      <div className="profile-menu-body">
        <ul className="profile-menu-list">
          <li className="profile-menu-item">
            <Link to={user?.type === 'recruiter' ? '/recruiter-profile' : '/mon-profil'}>
              <i className="fas fa-user"></i>
              <span>Mon profil</span>
            </Link>
          </li>
          <li className="profile-menu-item">
            <Link to="/parametres">
              <i className="fas fa-cog"></i>
              <span>Paramètres</span>
            </Link>
          </li>
          <li className="profile-menu-item">
            <Link to="/aide">
              <i className="fas fa-question-circle"></i>
              <span>Aide et support</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="profile-menu-footer">
        <button className="logout-btn" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;