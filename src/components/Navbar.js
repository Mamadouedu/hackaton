import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatIcon from './chat/ChatIcon';
import ChatWindow from './chat/ChatWindow';

const Navbar = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">TM</div>
        TalentMatch
      </Link>
      <div className="nav-links">
        <Link to="/entreprises" className="nav-link">Entreprises</Link>
        <Link to="/offres" className="nav-link">Offres</Link>
        <Link to="/candidats" className="nav-link">Candidats</Link>
        <Link to="/conseils" className="nav-link">Conseils</Link>
        
        {/* Bouton du chat */}
        <button 
          onClick={() => setShowChat(!showChat)} 
          className="chat-button"
          aria-label="Ouvrir le chat"
        >
          <ChatIcon />
        </button>
      </div>

      {/* Fenêtre de chat */}
      {showChat && (
        <div className="chat-container">
          <ChatWindow onClose={() => setShowChat(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;