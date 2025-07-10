import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Bem-vindo ao painel administrativo!</p>
      </div>
    </div>
  );
};

export default AdminPanel;