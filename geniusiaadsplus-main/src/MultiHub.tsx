import React, { useState } from 'react';
import Voos from './Voos';
import Hoteis from './Hoteis';
import Restaurantes from './Restaurantes';

export default function MultiHub() {
  const [abaAtiva, setAbaAtiva] = useState<'voo' | 'restaurante' | 'hotel'>('voo');

  const renderContent = () => {
    switch (abaAtiva) {
      case 'voo':
        return <Voos />;
      case 'restaurante':
        return <Restaurantes />;
      case 'hotel':
        return <Hoteis />;
      default:
        return <Voos />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-center border-b pb-2 flex-wrap">
        <button onClick={() => setAbaAtiva('voo')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'voo' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>✈️ Voos</button>
        <button onClick={() => setAbaAtiva('restaurante')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'restaurante' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>🍽️ Restaurantes</button>
        <button onClick={() => setAbaAtiva('hotel')} className={`px-4 py-2 rounded-t-lg transition-colors ${abaAtiva === 'hotel' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}>🏨 Hotéis</button>
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
}
