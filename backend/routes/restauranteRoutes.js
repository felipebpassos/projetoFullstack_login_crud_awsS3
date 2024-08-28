const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const { updateRestauranteLogo, getRestauranteInfo, updateRestauranteInfo } = require('../controllers/restauranteController');

// Configuração do multer para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

// Rota para obter informações do restaurante autenticado
router.get('/me', verifyToken, getRestauranteInfo);

// Rota para atualizar informações do restaurante autenticado
router.put('/me', verifyToken, updateRestauranteInfo);

// Rota para atualizar a foto de perfil do restaurante autenticado
router.put('/me/logo', verifyToken, upload.single('logo'), updateRestauranteLogo);

module.exports = router;
