
import { Send, Bot, User } from 'lucide-react';
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
    <div className={`flex-1 flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-800' : 'bg-gray-50'
    }`}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Bot className={`h-16 w-16 mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
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
                    ? isDarkMode ? 'bg-orange-600' : 'bg-orange-500'
                    : isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className={`h-4 w-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-600'
                    }`} />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 transition-colors duration-300 ${
                  message.sender === 'user'
                    ? isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'
                    : isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-white text-gray-800 shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    message.sender === 'user'
                      ? 'text-orange-100'
                      : isDarkMode ? 'text-slate-400' : 'text-gray-500'
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

      {/* Input Area */}
      <div className={`border-t p-4 transition-colors duration-300 ${
        isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'
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
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
              } focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              inputMessage.trim()
                ? isDarkMode 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
                : isDarkMode
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
