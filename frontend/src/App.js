import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Clientes from './components/clientes';
import Formulario from './components/formulario';
import Cupons from './components/cupons';
import Aniversarios from './components/aniversarios';
import Relatorios from './components/relatorios';
import ErrorPage from './components/errorPage';

const App = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="clientes" element={<Clientes />} />
          <Route path="formulario" element={<Formulario />} />
          <Route path="cupons" element={<Cupons />} />
          <Route path="aniversarios" element={<Aniversarios />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Route>

      {/* Redirecionar para a página de erro não encontrada */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
