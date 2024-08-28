const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definição do esquema
const restauranteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String
  },
  senhaHash: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
});

// Criação do modelo
const Restaurante = mongoose.model('Restaurante', restauranteSchema);

module.exports = Restaurante;
