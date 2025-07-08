
import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import PainelAdminComAbas from './PainelAdminComAbas';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <PainelAdminComAbas />;
};

export default Admin;
