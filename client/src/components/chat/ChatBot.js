import { useState } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import { useAuth } from '../../context/AuthContext'; // Si vous utilisez l'authentification

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth(); // Adaptation à votre système d'authentification

  const handleSend = async (message) => {
    // Ajout du message utilisateur
    setMessages(prev => [...prev, {
      content: message,
      isUser: true,
      sender: currentUser.name // Adaptez selon votre modèle utilisateur
    }]);

    // Appel API à votre backend
    const response = await fetch('/api/openai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message,
        userId: currentUser.id // Envoyer des infos utilisateur si nécessaire
      })
    });

    const data = await response.json();
    setMessages(prev => [...prev, {
      content: data.reply,
      isUser: false,
      sender: 'Assistant RH'
    }]);
  };

  return (
    <div className="chat-container bg-white rounded-lg shadow-md p-4">
      <div className="messages space-y-3">
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            content={msg.content} 
            isUser={msg.isUser}
            sender={msg.sender}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}