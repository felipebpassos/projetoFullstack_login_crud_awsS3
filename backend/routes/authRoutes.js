const express = require('express');
const router = express.Router();
const { registerRestaurante, loginRestaurante, validateToken } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

// Rota para cadastro de restaurante
router.post('/register', registerRestaurante);

// Rota para login de restaurante
router.post('/login', loginRestaurante);

// Rota para validação do token
router.get('/validate-token', verifyToken, validateToken);

module.exports = router;
