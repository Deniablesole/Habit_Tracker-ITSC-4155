import React from 'react';

export const Header = ({ user, setView }) => (
    <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100">
      <div className="flex items-center gap-8">
        <button onClick={() => setView('dashboard')} className="text-2xl font-extrabold text-gray-900 tracking-tight hover:opacity-80 transition-opacity">
          Habit<span className="text-blue-600">Tracker</span>
        </button>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <button onClick={() => setView('profile')} className="flex items-center gap-3 pl-1 pr-4 py-1 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-all group">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
               {user[0].toUpperCase()}
            </div>
            <span className="text-sm font-bold text-gray-700 hidden sm:inline">{user}</span>
          </button>
        </div>
      )}
    </header>
);
