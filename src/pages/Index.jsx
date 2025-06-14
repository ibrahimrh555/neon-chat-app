
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Simuler des réponses automatiques du bot
  const getBotResponse = (userMessage) => {
    const responses = [
      "C'est une excellente question ! Laissez-moi y réfléchir...",
      "Je comprends votre point de vue. Voici ce que je pense...",
      "Intéressant ! Basé sur les informations que vous avez partagées...",
      "Merci pour cette information. Je peux vous aider avec cela...",
      "C'est un sujet fascinant ! D'après mon expérience...",
      "Je vois ce que vous voulez dire. Une approche possible serait...",
      "Excellente observation ! Cela me rappelle...",
      "C'est une perspective intéressante. Permettez-moi d'ajouter...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} En ce qui concerne "${userMessage}", je pense que cela mérite une attention particulière. Que pensez-vous de cette approche ?`;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const createNewConversation = () => {
    const now = new Date().toISOString();
    return {
      id: `conv-${Date.now()}`,
      title: 'Nouvelle conversation',
      lastMessage: 'Conversation démarrée',
      timestamp: now,
      messages: []
    };
  };

  const handleNewConversation = () => {
    const newConversation = createNewConversation();
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = (id) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleSendMessage = (messageText) => {
    if (!activeConversationId) {
      // Créer une nouvelle conversation si aucune n'est active
      const newConversation = createNewConversation();
      const userMessage = {
        id: `msg-${Date.now()}`,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      const updatedConversation = {
        ...newConversation,
        title: messageText.slice(0, 30) + (messageText.length > 30 ? '...' : ''),
        lastMessage: messageText,
        messages: [userMessage]
      };

      setConversations(prev => [updatedConversation, ...prev]);
      setActiveConversationId(updatedConversation.id);

      // Simuler la réponse du bot après un délai
      setTimeout(() => {
        const botResponse = getBotResponse(messageText);
        const botMessage = {
          id: `msg-${Date.now()}`,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };

        setConversations(prev => prev.map(conv => 
          conv.id === updatedConversation.id 
            ? {
                ...conv,
                lastMessage: botResponse,
                timestamp: new Date().toISOString(),
                messages: [...conv.messages, botMessage]
              }
            : conv
        ));
      }, 1000 + Math.random() * 2000);
    } else {
      // Ajouter un message à la conversation existante
      const userMessage = {
        id: `msg-${Date.now()}`,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? {
              ...conv,
              lastMessage: messageText,
              timestamp: new Date().toISOString(),
              messages: [...conv.messages, userMessage]
            }
          : conv
      ));

      // Simuler la réponse du bot
      setTimeout(() => {
        const botResponse = getBotResponse(messageText);
        const botMessage = {
          id: `msg-${Date.now()}`,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };

        setConversations(prev => prev.map(conv => 
          conv.id === activeConversationId 
            ? {
                ...conv,
                lastMessage: botResponse,
                timestamp: new Date().toISOString(),
                messages: [...conv.messages, botMessage]
              }
            : conv
        ));
      }, 1000 + Math.random() * 2000);
    }
  };

  const getCurrentMessages = () => {
    if (!activeConversationId) return [];
    const activeConversation = conversations.find(conv => conv.id === activeConversationId);
    return activeConversation?.messages || [];
  };

  // Créer une conversation d'exemple au premier chargement
  useEffect(() => {
    if (conversations.length === 0) {
      const exampleConversation = {
        id: 'example-conv',
        title: 'Bienvenue ! Comment puis-je vous aider ?',
        lastMessage: 'Bonjour ! Je suis votre assistant ChatBot.',
        timestamp: new Date().toISOString(),
        messages: [
          {
            id: 'welcome-msg',
            text: 'Bonjour ! Je suis votre assistant ChatBot. Comment puis-je vous aider aujourd\'hui ?',
            sender: 'bot',
            timestamp: new Date().toISOString()
          }
        ]
      };
      setConversations([exampleConversation]);
      setActiveConversationId(exampleConversation.id);
    }
  }, []);

  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isDarkMode={isDarkMode}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        
        <ChatArea 
          isDarkMode={isDarkMode}
          messages={getCurrentMessages()}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Index;
