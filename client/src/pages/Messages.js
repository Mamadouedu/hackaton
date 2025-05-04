import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Messages = () => {
  const { currentUser } = useAuth();
  const [stars, setStars] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // 1. Génération des étoiles en background
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2}px`,
      duration: `${Math.random() * 5 + 3}s`
    }));
    setStars(newStars);
  }, []);

  // 2. Chargement initial des contacts et des messages
  useEffect(() => {
    const mockContacts = [ /* ... mêmes données que vous aviez ... */ ];
    setContacts(mockContacts);

    if (mockContacts.length > 0) {
      setActiveContact(mockContacts[0]);
    }
  }, []);

  // 3. Au changement de activeContact, charger ses messages
  useEffect(() => {
    if (!activeContact) return;

    const mockMessages = [ /* ... tous vos faux messages ... */ ];
    const filtered = mockMessages.filter(m => m.contactId === activeContact.id);

    setMessages(filtered);

    // Marquer lu
    setContacts(prev =>
      prev.map(c =>
        c.id === activeContact.id ? { ...c, nonLu: 0 } : c
      )
    );
  }, [activeContact]);

  // 4. Scroll automatique à chaque ajout de message
  useLayoutEffect(() => {
    const node = messagesEndRef.current;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  // 5. Envoi d'un nouveau message
  const handleSendMessage = e => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    const nextId = messages.length > 0
      ? Math.max(...messages.map(m => m.id)) + 1
      : 1;

    const me = {
      id: nextId,
      contactId: activeContact.id,
      expediteur: 'moi',
      contenu: newMessage,
      date: new Date().toISOString(),
      lu: true
    };

    setMessages(prev => [...prev, me]);
    setContacts(prev =>
      prev.map(c =>
        c.id === activeContact.id
          ? {
              ...c,
              dernierMessage: newMessage,
              dateMessage: new Date().toISOString()
            }
          : c
      )
    );
    setNewMessage('');

    // Réponse auto
    setTimeout(() => {
      const reply = {
        id: nextId + 1,
        contactId: activeContact.id,
        expediteur: 'contact',
        contenu: 'Merci pour votre message. Je vous réponds dans les plus brefs délais.',
        date: new Date().toISOString(),
        lu: false
      };
      setMessages(prev => [...prev, reply]);
      setContacts(prev =>
        prev.map(c =>
          c.id === activeContact.id
            ? {
                ...c,
                dernierMessage: reply.contenu,
                dateMessage: reply.date,
                nonLu: 1
              }
            : c
        )
      );
    }, 2000);
  };

  // 6. Formatage de la date (aujourd'hui, hier, ou date courte)
  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return `Hier, ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  // 7. Filtrage des contacts
  const filteredContacts = contacts.filter(c =>
    c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Background étoiles */}
      <div className="stars">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration} infinite`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="dashboard-header">
        {/* … votre code de nav … */}
      </header>

      {/* Contenu principal */}
      <div className="dashboard-content">
        {/* Sidebar contacts */}
        <aside className="dashboard-sidebar">
          {/* … votre code … */}
        </aside>

        {/* Zone messages */}
        <main className="messages-main">
          <div className="messages-container">
            {/* Liste contacts */}
            <div className="contacts-sidebar">
              {/* … search + liste filteredContacts … */}
            </div>

            {/* Conversation */}
            {activeContact ? (
              <div className="conversation">
                {/* En-tête conversation */}
                <div className="conversation-header">
                  {/* … avatar, nom, statut … */}
                </div>

                {/* Corps des messages */}
                <div className="messages-list">
                  {messages.map((msg, idx) => {
                    const showDate =
                      idx === 0 ||
                      new Date(msg.date).toDateString() !==
                        new Date(messages[idx - 1].date).toDateString();
                    return (
                      <React.Fragment key={msg.id}>
                        {showDate && (
                          <div className="date-separator">
                            <span>
                              {new Date(msg.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                        <div className={`message ${msg.expediteur === 'moi' ? 'sent' : 'received'}`}>
                          <div className="message-content">{msg.contenu}</div>
                          <div className="message-time">
                            {formatDate(msg.date)}
                            {msg.expediteur === 'moi' && (
                              <i className={`status-icon ${msg.lu ? 'fas fa-check-double' : 'fas fa-check'}`} />
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Formulaire d’envoi */}
                <form className="message-form" onSubmit={handleSendMessage}>
                  <button type="button" className="action-btn attach-btn">
                    <i className="fas fa-paperclip" />
                  </button>
                  <input
                    type="text"
                    placeholder="Tapez votre message..."
                    className="message-input"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                  />
                  <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="no-conversation">
                <div className="no-conversation-content">
                  <i className="fas fa-comments no-conversation-icon" />
                  <h3>Sélectionnez une conversation</h3>
                  <p>Choisissez un contact pour commencer à discuter</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
