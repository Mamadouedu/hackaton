import React, { useState } from 'react';
import Message from './Message';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    
    try {
      const response = await fetch('http://localhost:4000/api/openai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Désolé, une erreur s'est produite", isUser: false }]);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Assistant RH</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question..."
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
};

export default ChatWindow;