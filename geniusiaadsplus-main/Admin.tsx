import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <AdminPanel />;
};

export default Admin;
