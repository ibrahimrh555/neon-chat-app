
import { Search, Heart, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-orange-400' : 'text-orange-600'
            }`}>
              ChatBot
              <span className={`text-sm font-normal ml-2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                Assistant Intelligent
              </span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-orange-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                } focus:outline-none focus:ring-1 focus:ring-orange-500`}
                placeholder="Rechercher dans l'historique..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-orange-400' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'text-slate-300 hover:bg-slate-800 hover:text-red-400' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
            }`}>
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
