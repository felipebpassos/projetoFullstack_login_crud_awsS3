import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para redirecionamento
import '../styles/meusDados.css'; // Importa o CSS próprio

const MeusDados = ({ restaurante, token }) => { // Recebe os dados do restaurante e token como props
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // Estado para a URL da imagem pré-visualizada
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  // Função para lidar com a seleção do arquivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Cria uma URL temporária para a pré-visualização da imagem
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  // Função para enviar o arquivo para o backend
  const handleSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true); // Define o estado de carregamento como verdadeiro

    const formData = new FormData();
    formData.append('logo', selectedFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurante/me/logo`, {
        method: 'PUT', // Atualiza as informações com o método PUT
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Imagem enviada com sucesso!');
        navigate('/dashboard'); // Redireciona para /dashboard após o upload bem-sucedido
      } else {
        console.error('Erro ao enviar a imagem');
      }
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    } finally {
      setLoading(false); // Define o estado de carregamento como falso
    }
  };

  return (
    <div className="meus-dados-container">
      <h2>Editar Meus Dados</h2>
      <div
        className="profile-picture"
        onClick={() => document.getElementById('fileInput').click()}
      >
        <img
          src={preview || (restaurante && restaurante.logo ? restaurante.logo : '/img/default.png')} // Usa a imagem pré-visualizada ou a imagem padrão
          alt="Foto do Perfil"
        />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Imagem'}
      </button>
    </div>
  );
};

export default MeusDados;
