import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRestaurant from '../hooks/useRestaurant';
import Header from './header';
import Sidebar from './sidebar';
import ContentArea from './contentArea';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { restaurante, loading } = useRestaurant(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header 
        restaurante={restaurante} 
        loading={loading} 
        onLogout={handleLogout} 
        token={token} // Passa o token para o Header
      />

      {/* Layout principal do dashboard */}
      <div className="dashboard-layout">
        <Sidebar />
        <ContentArea />
      </div>
    </div>
  );
};

export default Dashboard;
