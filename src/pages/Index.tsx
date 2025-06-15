
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  file?: {
    name: string;
    type: string;
    size: number;
    url: string;
  };
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Simuler des réponses automatiques du bot
  const getBotResponse = (userMessage: string): string => {
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

  const createNewConversation = (): Conversation => {
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

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleSendMessage = (messageText: string, file?: File) => {
    const createMessage = (text: string, sender: 'user' | 'bot', attachedFile?: File): Message => {
      const message: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        text,
        sender,
        timestamp: new Date().toISOString()
      };

      if (attachedFile) {
        message.file = {
          name: attachedFile.name,
          type: attachedFile.type,
          size: attachedFile.size,
          url: URL.createObjectURL(attachedFile)
        };
      }

      return message;
    };

    if (!activeConversationId) {
      // Créer une nouvelle conversation si aucune n'est active
      const newConversation = createNewConversation();
      const userMessage = createMessage(messageText, 'user', file);

      const conversationTitle = messageText || file?.name || 'Nouvelle conversation';
      const updatedConversation = {
        ...newConversation,
        title: conversationTitle.slice(0, 30) + (conversationTitle.length > 30 ? '...' : ''),
        lastMessage: messageText || `📎 ${file?.name}`,
        messages: [userMessage]
      };

      setConversations(prev => [updatedConversation, ...prev]);
      setActiveConversationId(updatedConversation.id);

      // Simuler la réponse du bot après un délai
      if (messageText) {
        setTimeout(() => {
          const botResponse = getBotResponse(messageText);
          const botMessage = createMessage(botResponse, 'bot');

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
      }
    } else {
      // Ajouter un message à la conversation existante
      const userMessage = createMessage(messageText, 'user', file);

      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? {
              ...conv,
              lastMessage: messageText || `📎 ${file?.name}`,
              timestamp: new Date().toISOString(),
              messages: [...conv.messages, userMessage]
            }
          : conv
      ));

      // Simuler la réponse du bot
      if (messageText) {
        setTimeout(() => {
          const botResponse = getBotResponse(messageText);
          const botMessage = createMessage(botResponse, 'bot');

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
    }
  };

  const getCurrentMessages = (): Message[] => {
    if (!activeConversationId) return [];
    const activeConversation = conversations.find(conv => conv.id === activeConversationId);
    return activeConversation?.messages || [];
  };

  // Créer une conversation d'exemple au premier chargement
  useEffect(() => {
    if (conversations.length === 0) {
      const exampleConversation: Conversation = {
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
