
interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface SidebarProps {
  isDarkMode: boolean;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar = ({ 
  isDarkMode, 
  conversations, 
  activeConversationId, 
  onSelectConversation, 
  onNewConversation,
  onDeleteConversation 
}: SidebarProps) => {
  return (
    <div className={`w-80 border-r transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-50/30 border-gray-100'
    } flex flex-col h-full`}>
      {/* Header - Fixed */}
      <div className={`flex-shrink-0 p-4 border-b transition-colors duration-300 ${
        isDarkMode ? 'border-slate-700' : 'border-gray-100'
      }`}>
        <button
          onClick={onNewConversation}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-orange-600 hover:bg-orange-700 text-white' 
              : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-sm'
          }`}
        >
          {/* Plus Icon */}
          <div className="w-5 h-5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          Nouvelle conversation
        </button>
      </div>

      {/* Conversations List - Scrollable */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className={`flex-shrink-0 p-4 pb-2 text-sm font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-slate-300' : 'text-gray-600'
        }`}>
          Historique des conversations
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {conversations.length === 0 ? (
            <div className={`text-center py-8 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`}>
              {/* Message Circle Icon */}
              <div className="w-12 h-12 mx-auto mb-3 opacity-50">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm">Aucune conversation</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`group p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeConversationId === conversation.id
                    ? isDarkMode 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border border-orange-200 shadow-sm'
                    : isDarkMode
                      ? 'hover:bg-slate-800 text-slate-300'
                      : 'hover:bg-white text-gray-700 hover:shadow-sm border border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {conversation.title}
                    </h3>
                    <p className={`text-xs mt-1 truncate transition-colors duration-300 ${
                      activeConversationId === conversation.id
                        ? isDarkMode ? 'text-orange-100' : 'text-orange-600'
                        : isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                    <p className={`text-xs mt-1 transition-colors duration-300 ${
                      activeConversationId === conversation.id
                        ? isDarkMode ? 'text-orange-200' : 'text-orange-500'
                        : isDarkMode ? 'text-slate-500' : 'text-gray-400'
                    }`}>
                      {conversation.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 ${
                      isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    {/* Trash Icon */}
                    <div className="w-4 h-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
