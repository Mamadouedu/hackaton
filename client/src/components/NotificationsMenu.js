import React from 'react';
import { Link } from 'react-router-dom';

const NotificationsMenu = ({ notifications, onClose }) => {
  return (
    <div className="notifications-menu">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      {notifications && notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.read ? '' : 'unread'}`}>
              <div className="notification-icon">
                <i className={`fas ${notification.icon}`}></i>
              </div>
              <div className="notification-content">
                <p className="notification-text">{notification.text}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notifications">
          <p>Aucune notification pour le moment</p>
        </div>
      )}
      
      <div className="notifications-footer">
        <Link to="/notifications" className="view-all-link">Voir toutes les notifications</Link>
      </div>
    </div>
  );
};

export default NotificationsMenu;