const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// URL base da API
const apiUrl = process.env.API_URL || 'http://localhost:5000';

// Dados para criar um restaurante
const restauranteData = {
  nome: 'Restaurante Teste',
  endereco: 'Rua Teste, 123',
  telefone: '(11) 98765-4321',
  email: 'teste@restaurante.com',
  senha: 'senha123',
  cnpj: '12.345.678/0001-99',
  cidade: 'Sergipe',
  estado: 'SE'
};

// Função para cadastrar um restaurante
const seedRestaurante = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, restauranteData);
    console.log('Restaurante cadastrado com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao cadastrar restaurante:', error.response ? error.response.data : error.message);
  }
};

// Executar a função
seedRestaurante();
