
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatAreaProps {
  isDarkMode: boolean;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatArea = ({ isDarkMode, messages, onSendMessage }: ChatAreaProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex-1 flex flex-col h-full transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-gray-50 to-gray-100/50'
    }`}>
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              {/* Bot Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-600' : 'text-gray-300'
              }`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Bienvenue dans votre assistant ChatBot
              </h3>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Commencez une conversation en tapant votre message ci-dessous
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  message.sender === 'user'
                    ? isDarkMode ? 'bg-orange-600' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                    : isDarkMode ? 'bg-slate-700' : 'bg-white border-2 border-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <div className="w-4 h-4 text-white">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ) : (
                    <div className={`w-4 h-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-500'
                    }`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 transition-colors duration-300 ${
                  message.sender === 'user'
                    ? isDarkMode ? 'bg-orange-600 text-white' : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm'
                    : isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    message.sender === 'user'
                      ? isDarkMode ? 'text-orange-100' : 'text-orange-100'
                      : isDarkMode ? 'text-slate-400' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className={`flex-shrink-0 border-t p-4 transition-colors duration-300 ${
        isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white/80 backdrop-blur-sm'
      }`}>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tapez votre message ici..."
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-orange-400' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:shadow-sm'
              } focus:outline-none focus:ring-1 focus:ring-orange-400`}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              inputMessage.trim()
                ? isDarkMode 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-sm hover:shadow-md'
                : isDarkMode
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {/* Send Icon */}
            <div className="w-5 h-5">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
