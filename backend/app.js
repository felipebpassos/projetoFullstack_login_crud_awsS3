const express = require('express');
const dotenv = require('dotenv'); // Importa o dotenv
const connectDB = require('./config/db'); // Importa a função de conexão com o MongoDB
const cors = require('cors');

// Configura o dotenv para carregar as variáveis de ambiente
dotenv.config();

const app = express();

// Conectar ao MongoDB
connectDB();

// Configurar CORS
app.use(cors());

// Define a porta em que o servidor vai rodar
const port = process.env.PORT || 5000; // Usa a porta do ambiente ou 5000 por padrão

app.use(express.json());

// Rotas
app.use('/auth', require('./routes/authRoutes')); // Rota para cadastro, login de usuários
app.use('/restaurante', require('./routes/restauranteRoutes')); // Acessar dados referente aos restaurantes cadastrados
app.use('/form', require('./routes/formRoutes')); // Criar, editar formulários de pesquisa de satisfação
app.use('/feedbacks', require('./routes/feedbacksRoutes')); // Post, get de feedbacks dos usuários
app.use('/clients', require('./routes/clientsRoutes')); // Cadastro de clientes

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
