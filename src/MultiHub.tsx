import React, { useState } from 'react';
import Voos from './Voos';
import Hoteis from './Hoteis';
import Restaurantes from './Restaurantes';

export default function MultiHub() {
  const [abaAtiva, setAbaAtiva] = useState<'voo' | 'restaurante' | 'hotel'>('voo');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Genius Hub IA – Multi Serviços</h2>
      <PainelAdminComAbas />
      </div>
    </div>
  );
}
