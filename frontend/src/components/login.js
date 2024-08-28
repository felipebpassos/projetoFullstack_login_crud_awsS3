import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Cliente Feliz";
    console.log('API URL:', process.env.REACT_APP_API_URL);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, senha });
      localStorage.setItem('token', response.data.token);
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
