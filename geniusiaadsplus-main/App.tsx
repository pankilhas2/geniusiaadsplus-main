import React, { useState } from 'react';
import Jobs from './Jobs';
import MultiHub from './MultiHub';
import Assistant from './Assistant';
import Admin from './Admin';

const App: React.FC = () => {
  const [tab, setTab] = useState('jobs');

  const renderTab = () => {
    switch (tab) {
      case 'jobs': return <Jobs />;
      case 'services': return <MultiHub />;
      case 'assistant': return <Assistant />;
      case 'admin': return <Admin />;
      default: return <Jobs />;
    }
  };
  
  const tabs = [
    { id: 'jobs', label: 'Empregos', icon: '🔍' },
    { id: 'services', label: 'Serviços', icon: '✈️' },
    { id: 'assistant', label: 'Assistente IA', icon: '🤖' },
    { id: 'admin', label: 'Admin', icon: '🛠️' },
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-sans">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">🌐 Genius Hub IA</h1>
      </header>
      <nav className="flex justify-center space-x-1 sm:space-x-2 mb-8 flex-wrap">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            className={`px-3 py-2 m-1 rounded-full text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${tab === id ? 'bg-white text-indigo-700 font-bold shadow-lg' : 'bg-indigo-500 hover:bg-indigo-400'}`}
            onClick={() => setTab(id)}
          >
            <span className="mr-2" aria-hidden="true">{icon}</span>{label}
          </button>
        ))}
      </nav>

      <main className="bg-white/90 backdrop-blur-sm text-black rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
        {renderTab()}
      </main>
      
      <footer className="text-center text-indigo-200 mt-8 text-sm">
        <p>Powered by Gemini & Supabase</p>
      </footer>
    </div>
  );
};

export default App;
