// src/components/ErrorPage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4">404</h1>
      <p className="lead">A página que você está procurando não foi encontrada.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Voltar para a página inicial
      </Button>
    </Container>
  );
};

export default ErrorPage;
