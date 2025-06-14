
import { useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-orange-400' : 'text-orange-500'
            }`}>
              ChatBot
              <span className={`text-sm font-normal ml-2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-500'
              }`}>
                Assistant Intelligent
              </span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Search Icon */}
                <div className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-orange-400' 
                    : 'bg-gray-50/50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:bg-white'
                } focus:outline-none focus:ring-1 focus:ring-orange-400`}
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
                  : 'text-gray-500 hover:bg-gray-50 hover:text-orange-500'
              }`}
            >
              {/* Theme Icon */}
              <div className="w-5 h-5">
                {isDarkMode ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>
            <button className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'text-slate-300 hover:bg-slate-800 hover:text-red-400' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-red-500'
            }`}>
              {/* Heart Icon */}
              <div className="w-5 h-5">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
