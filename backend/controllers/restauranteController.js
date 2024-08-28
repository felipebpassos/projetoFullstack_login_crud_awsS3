const Restaurante = require('../models/Restaurantes');
const { uploadProfilePicFile } = require('../services/awsS3Service');

// Função para obter informações do restaurante autenticado
const getRestauranteInfo = async (req, res) => {
  try {
    // Obtém o ID do restaurante do objeto req.restaurante
    const restauranteId = req.restaurante.id;

    // Busca o restaurante no banco de dados
    const restaurante = await Restaurante.findById(restauranteId);

    if (!restaurante) {
      return res.status(404).json({ msg: 'Restaurante não encontrado' });
    }

    // Retorna as informações do restaurante
    res.json(restaurante);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Função para atualizar informações do restaurante autenticado
const updateRestauranteInfo = async (req, res) => {
  try {
    // Obtém o ID do restaurante do objeto req.restaurante
    const restauranteId = req.restaurante.id;

    // Dados a serem atualizados
    const { nome, endereco, telefone, logo, cnpj, cidade, estado } = req.body;

    // Atualiza o restaurante no banco de dados
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      { nome, endereco, telefone, logo, cnpj, cidade, estado, atualizadoEm: Date.now() },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedRestaurante) {
      return res.status(404).json({ msg: 'Restaurante não encontrado' });
    }

    // Retorna o restaurante atualizado
    res.json(updatedRestaurante);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Função para atualizar a foto do perfil do restaurante
const updateRestauranteLogo = async (req, res) => {
  try {
    // Obtém o ID do restaurante do objeto req.restaurante
    const restauranteId = req.restaurante.id;

    // Verifica se um arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ msg: 'Nenhum arquivo enviado' });
    }

    // Envia o arquivo para o S3 e obtém a URL
    const fileContent = req.file.buffer;
    const fileName = req.file.originalname;
    const mimeType = req.file.mimetype;
    const { URL } = await uploadProfilePicFile(fileContent, fileName, mimeType);

    // Atualiza o restaurante no banco de dados
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      { logo: URL, atualizadoEm: Date.now() },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedRestaurante) {
      return res.status(404).json({ msg: 'Restaurante não encontrado' });
    }

    // Retorna o restaurante atualizado
    res.json(updatedRestaurante);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  getRestauranteInfo,
  updateRestauranteInfo,
  updateRestauranteLogo,
};
