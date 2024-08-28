const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Restaurante = require('../models/Restaurantes');

// Função para registrar um novo restaurante
const registerRestaurante = async (req, res) => {
  const { nome, endereco, telefone, email, senha, cnpj, cidade, estado } = req.body;

  try {
    // Verificar se o restaurante já existe
    let restaurante = await Restaurante.findOne({ email });
    if (restaurante) {
      return res.status(400).json({ msg: 'Restaurante já cadastrado' });
    }

    // Criar um novo restaurante
    restaurante = new Restaurante({
      nome,
      endereco,
      telefone,
      email,
      senhaHash: await bcrypt.hash(senha, 10),
      cnpj,
      cidade,
      estado
    });

    await restaurante.save();

    // Gerar um token JWT
    const payload = {
      restaurante: {
        id: restaurante.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Função para logar um restaurante
const loginRestaurante = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o restaurante existe
    const restaurante = await Restaurante.findOne({ email });
    if (!restaurante) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(senha, restaurante.senhaHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Gerar um token JWT
    const payload = {
      restaurante: {
        id: restaurante.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Função para validar o token JWT
const validateToken = (req, res) => {
  res.status(200).json({ msg: 'Token é válido' });
};

module.exports = {
  registerRestaurante,
  loginRestaurante,
  validateToken
};
