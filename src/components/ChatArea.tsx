
import { Send, Bot, User, Paperclip } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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

interface ChatAreaProps {
  isDarkMode: boolean;
  messages: Message[];
  onSendMessage: (message: string, file?: File) => void;
}

const ChatArea = ({ isDarkMode, messages, onSendMessage }: ChatAreaProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() || selectedFile) {
      onSendMessage(inputMessage.trim(), selectedFile || undefined);
      setInputMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <Bot className={`h-16 w-16 mx-auto mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-600' : 'text-gray-300'
              }`} />
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
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className={`h-4 w-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-gray-500'
                    }`} />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 transition-colors duration-300 ${
                  message.sender === 'user'
                    ? isDarkMode ? 'bg-orange-600 text-white' : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm'
                    : isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                }`}>
                  {message.file && (
                    <div className={`mb-2 p-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-orange-500/30'
                        : isDarkMode ? 'bg-slate-600' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{message.file.name}</p>
                          <p className={`text-xs ${
                            message.sender === 'user'
                              ? 'text-orange-100'
                              : isDarkMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>
                            {formatFileSize(message.file.size)}
                          </p>
                        </div>
                      </div>
                      {message.file.type.startsWith('image/') && (
                        <img 
                          src={message.file.url} 
                          alt={message.file.name}
                          className="mt-2 max-w-full h-auto rounded"
                          style={{ maxHeight: '200px' }}
                        />
                      )}
                    </div>
                  )}
                  {message.text && (
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  )}
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
        {selectedFile && (
          <div className={`mb-3 p-3 rounded-lg border transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Paperclip className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedFile.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className={`text-sm px-2 py-1 rounded transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tapez votre message ici..."
              className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-orange-400' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:shadow-sm'
              } focus:outline-none focus:ring-1 focus:ring-orange-400`}
            />
            <button
              type="button"
              onClick={handleFileSelect}
              className={`px-3 py-3 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim() && !selectedFile}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              (inputMessage.trim() || selectedFile)
                ? isDarkMode 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-sm hover:shadow-md'
                : isDarkMode
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.txt"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatArea;
