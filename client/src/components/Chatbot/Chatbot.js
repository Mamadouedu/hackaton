import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, UserCircle2, Loader2, Sun, Moon, Plus, MoreVertical, Trash2 } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Discussion précédente", date: "Aujourd'hui" }
  ]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const apiUrl = 'http://localhost:4000/chat';

  // Exemples de questions
  const exampleQuestions = [
    "Explique l'informatique quantique simplement",
    "Donne des idées créatives pour un anniversaire de 10 ans",
    "Comment faire une requête HTTP en JavaScript ?"
  ];

  useEffect(() => {
    startNewConversation();
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startNewConversation = () => {
    const newId = Date.now();
    setCurrentConversation(newId);
    setMessages([]);
    setInput('');
    
    // Ajouter la conversation à l'historique
    if (messages.length > 0) {
      const firstUserMessage = messages.find(m => m.sender === 'user');
      const title = firstUserMessage 
        ? firstUserMessage.text.substring(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '')
        : "Nouvelle conversation";
      
      setConversations(prev => [
        { id: newId, title: title, date: "Aujourd'hui" },
        ...prev
      ]);
    }
    
    // Message de bienvenue
    setTimeout(() => {
      const welcomeMessage = {
        text: "Bonjour ! Je suis votre assistant IA. Posez-moi vos questions.",
        sender: 'bot',
        id: Date.now()
      };
      setMessages([welcomeMessage]);
    }, 500);
    
    // Focus sur l'input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 600);
  };

  // Fonction pour envoyer un message à l'API OpenAI
  const sendMessageToOpenAI = async (messageText) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: messageText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la communication avec l\'API');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  };

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;
    
    // Récupération du texte pour les exemples de questions
    if (exampleQuestions.includes(messageText)) {
      console.log("Exemple sélectionné:", messageText);
    }
  
    const userMessage = { text: messageText, sender: 'user', id: Date.now() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Si c'est le premier message de l'utilisateur, mettre à jour le titre de la conversation
    if (messages.length === 1 && messages[0].sender === 'bot') {
      const title = messageText.substring(0, 30) + (messageText.length > 30 ? '...' : '');
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversation 
            ? { ...conv, title } 
            : conv
        )
      );
    }
  
    try {
      // Appel à l'API OpenAI
      const answer = await sendMessageToOpenAI(messageText);
      
      const botMessage = {
        text: answer,
        sender: 'bot',
        id: Date.now() + 1
      };
  
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, {
        text: 'Désolé, une erreur est survenue lors du traitement de votre demande. Veuillez réessayer.',
        sender: 'bot',
        isError: true,
        id: Date.now() + 1
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const deleteConversation = (id, e) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    if (id === currentConversation) {
      startNewConversation();
    }
  };

  const selectConversation = (id) => {
    setCurrentConversation(id);
    // Dans une vraie application, ici on chargerait les messages de cette conversation
    setMessages([{
      text: "Historique de conversation chargé. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      id: Date.now()
    }]);
  };

  // Vérifier si on est sur mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (!mounted) {
    return null; // Évite le rendu avant l'initialisation complète
  }

  // Styles pour les éléments
  const styles = {
    container: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: darkMode ? '#0f0720' : '#f9fafb',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    sidebar: {
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      width: '16rem',
      borderRight: `1px solid ${darkMode ? '#2a1d45' : '#e5e7eb'}`,
      backgroundColor: darkMode ? '#160b30' : '#ffffff'
    },
    newChatButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      margin: '0.5rem',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      backgroundColor: darkMode ? '#2a1d45' : '#f3f4f6',
      cursor: 'pointer',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    conversationItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      marginBottom: '0.25rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      backgroundColor: isActive 
        ? (darkMode ? '#2a1d45' : '#e5e7eb') 
        : 'transparent'
    }),
    conversationTitle: {
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    conversationDate: {
      fontSize: '0.75rem',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    deleteButton: {
      padding: '0.25rem',
      borderRadius: '9999px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    themeToggle: {
      padding: '1rem',
      borderTop: `1px solid ${darkMode ? '#2a1d45' : '#e5e7eb'}`
    },
    themeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      width: '100%',
      borderRadius: '0.375rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: darkMode ? '#ffffff' : '#1f2937',
      cursor: 'pointer'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    header: {
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${darkMode ? '#2a1d45' : '#e5e7eb'}`
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    headerText: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    headerSubtitle: {
      fontSize: '0.875rem',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    mobileMenuButton: {
      padding: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    mainArea: {
      flex: 1,
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: darkMode ? '#0f0720' : '#f9fafb'
    },
    examplesContainer: {
      maxWidth: '42rem',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1.5rem'
    },
    exampleGrid: {
      display: 'grid',
      gap: '0.75rem',
      marginBottom: '2rem'
    },
    exampleButton: {
      padding: '1rem',
      borderRadius: '0.375rem',
      textAlign: 'left',
      backgroundColor: darkMode ? '#160b30' : '#ffffff',
      border: `1px solid ${darkMode ? '#2a1d45' : '#e5e7eb'}`,
      color: darkMode ? '#ffffff' : '#1f2937',
      cursor: 'pointer'
    },
    listContainer: {
      marginBottom: '1.5rem',
      color: darkMode ? '#d1d5db' : '#4b5563'
    },
    listItem: {
      marginBottom: '0.5rem'
    },
    messageContainer: {
      maxWidth: '42rem',
      margin: '0 auto'
    },
    messageWrapper: (isUser) => ({
      marginBottom: '1.5rem',
      marginLeft: isUser ? 'auto' : '0'
    }),
    messageContent: (isUser) => ({
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      flexDirection: isUser ? 'row-reverse' : 'row'
    }),
    avatar: (type) => ({
      flexShrink: 0,
      width: '2rem',
      height: '2rem',
      borderRadius: '9999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: type === 'user' 
        ? '#6d28d9' 
        : (type === 'error' ? '#dc2626' : '#059669')
    }),
    messageBubble: (type) => ({
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      maxWidth: '80%',
      whiteSpace: 'pre-wrap',
      backgroundColor: 
        type === 'user' 
          ? (darkMode ? '#2a1d45' : '#ede9fe') 
          : (type === 'error'
              ? (darkMode ? 'rgba(220, 38, 38, 0.3)' : '#fee2e2')
              : (darkMode ? '#160b30' : '#ffffff')),
      border: type !== 'user' && !darkMode ? '1px solid #e5e7eb' : 'none'
    }),
    loadingContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    loadingContent: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: darkMode ? '#160b30' : '#ffffff',
      border: !darkMode ? '1px solid #e5e7eb' : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    loadingText: {
      fontSize: '0.875rem',
      color: darkMode ? '#9ca3af' : '#6b7280'
    },
    inputArea: {
      padding: '1rem',
      borderTop: `1px solid ${darkMode ? '#2a1d45' : '#e5e7eb'}`,
      backgroundColor: darkMode ? '#160b30' : '#ffffff'
    },
    inputContainer: {
      maxWidth: '42rem',
      margin: '0 auto',
      position: 'relative'
    },
    inputFlex: {
      display: 'flex'
    },
    textarea: {
      flex: 1,
      border: `1px solid ${darkMode ? '#3a2d55' : '#d1d5db'}`,
      borderRight: 'none',
      borderRadius: '0.5rem 0 0 0.5rem',
      padding: '0.75rem 1rem',
      outline: 'none',
      resize: 'none',
      overflowY: 'auto',
      maxHeight: '8rem',
      minHeight: '2.875rem',
      backgroundColor: darkMode ? '#2a1d45' : '#ffffff',
      color: darkMode ? '#ffffff' : '#1f2937'
    },
    sendButton: (active) => ({
      padding: '0 1rem',
      borderRadius: '0 0.5rem 0.5rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      backgroundColor: active 
        ? '#059669' 
        : (darkMode ? '#3a2d55' : '#d1d5db'),
      color: '#ffffff',
      cursor: active ? 'pointer' : 'not-allowed',
      opacity: active ? 1 : 0.5
    }),
    disclaimer: {
      marginTop: '0.5rem',
      fontSize: '0.75rem',
      textAlign: 'center',
      color: darkMode ? '#9ca3af' : '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <button 
          onClick={startNewConversation} 
          style={styles.newChatButton}
        >
          <Plus size={16} />
          <span>Nouvelle discussion</span>
        </button>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
          {conversations.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              style={styles.conversationItem(currentConversation === conv.id)}
            >
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={styles.conversationTitle}>{conv.title}</div>
                <div style={styles.conversationDate}>{conv.date}</div>
              </div>
              <button 
                onClick={(e) => deleteConversation(conv.id, e)}
                style={styles.deleteButton}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <div style={styles.themeToggle}>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            style={styles.themeButton}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? 'Mode clair' : 'Mode sombre'}</span>
          </button>
        </div>
      </div>
      
      {/* Zone principale */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              backgroundImage: 'linear-gradient(90deg, #7e22ce, #3b82f6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: 0,
              padding: 0,
              textShadow: darkMode ? '0 0 10px rgba(126, 34, 206, 0.5)' : 'none'
            }}>
              Talent Match IA
            </h1>
            {currentConversation && (
              <span style={styles.headerSubtitle}>
                {conversations.find(c => c.id === currentConversation)?.title || 'Nouvelle conversation'}
              </span>
            )}
          </div>
          {isMobile && (
            <button style={styles.mobileMenuButton}>
              <MoreVertical size={20} />
            </button>
          )}
        </header>
        
        {/* Contenu */}
        <main style={styles.mainArea}>
          {messages.length === 1 && messages[0].sender === 'bot' && (
            <div style={styles.examplesContainer}>
              <h2 style={styles.sectionTitle}>Exemples</h2>
              <div style={styles.exampleGrid}>
                {exampleQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(question)}
                    style={styles.exampleButton}
                  >
                    "{question}" →
                  </button>
                ))}
              </div>
              
              <h2 style={styles.sectionTitle}>Capacités</h2>
              <ul style={styles.listContainer}>
                <li style={styles.listItem}>• Se souvient de ce que vous avez dit précédemment</li>
                <li style={styles.listItem}>• Permet des corrections de suivi</li>
                <li style={styles.listItem}>• Formé pour refuser les demandes inappropriées</li>
              </ul>
              
              <h2 style={styles.sectionTitle}>Limitations</h2>
              <ul style={styles.listContainer}>
                <li style={styles.listItem}>• Peut occasionnellement générer des informations incorrectes</li>
                <li style={styles.listItem}>• Connaissance limitée du monde après 2021</li>
              </ul>
            </div>
          )}
          
          <div style={styles.messageContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={styles.messageWrapper(msg.sender === 'user')}
              >
                <div style={styles.messageContent(msg.sender === 'user')}>
                  <div style={styles.avatar(msg.isError ? 'error' : msg.sender)}>
                    {msg.sender === 'user' ? 
                      <UserCircle2 size={20} color="white" /> : 
                      <Bot size={20} color="white" />
                    }
                  </div>
                  <div style={styles.messageBubble(msg.isError ? 'error' : msg.sender)}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={styles.loadingContainer}>
                <div style={styles.avatar('bot')}>
                  <Bot size={20} color="white" />
                </div>
                <div style={styles.loadingContent}>
                  <Loader2 
                    size={20} 
                    style={{
                      animation: 'spin 1s linear infinite',
                      '@keyframes spin': {
                        to: { transform: 'rotate(360deg)' }
                      }
                    }} 
                  />
                  <span style={styles.loadingText}>
                    En train de réfléchir...
                  </span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>
        
        {/* Input */}
        <div style={styles.inputArea}>
          <div style={styles.inputContainer}>
            <div style={styles.inputFlex}>
              <textarea
                ref={inputRef}
                placeholder="Envoyez un message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={styles.textarea}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                style={styles.sendButton(!isLoading && input.trim())}
              >
                <SendHorizonal size={20} />
              </button>
            </div>
            <div style={styles.disclaimer}>
              Vérifiez les informations importantes. L'assistant IA peut parfois faire des erreurs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;