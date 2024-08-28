import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ContentArea = () => {
  const location = useLocation();

  // Verifica se a rota é apenas "/dashboard"
  const isDashboardHome = location.pathname === '/dashboard';

  return (
    <main className="content-area">
      {isDashboardHome ? (
        <div className="dashboard-home-content">
          <h1>Bem-vindo ao Painel de Controle</h1>
          <p>Aqui você pode gerenciar todas as suas configurações e visualizar relatórios.</p>
          {/* Adicione mais conteúdo ou componentes conforme necessário */}
        </div>
      ) : (
        <Outlet /> // Renderiza o componente correspondente à rota atual
      )}
    </main>
  );
};

export default ContentArea;
