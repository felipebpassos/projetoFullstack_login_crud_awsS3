import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import CustomModal from './modal';
import MeusDados from './meusDados'; // Importando o componente MeusDados
import Configuracoes from './configuracoes'; // Importando o componente Configuracoes

const Header = ({ restaurante, loading, onLogout, token }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="dashboard-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div
          className="profile-container"
          onClick={toggleDropdown}
          ref={profileRef}
        >
          <img
            src={restaurante && restaurante.logo ? restaurante.logo : '/img/default.png'}
            alt="Profile"
            className="profile-image"
          />
          {restaurante && !loading && (
            <div className="profile-info">
              <span className="restaurant-name">{restaurante.nome}</span>
            </div>
          )}
          <svg
            className={`triangle ${dropdownOpen ? 'open' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 6"
            width="10"
            height="6"
          >
            <path d="M0 0L5 6L10 0H0Z" fill="black" />
          </svg>
          {dropdownOpen && (
            <div className="dropdown" ref={dropdownRef}>
              <ul>
                <li onClick={() => openModal('Meus dados')}>Meus dados</li>
                <li onClick={() => openModal('Configurações')}>Configurações</li>
                <li onClick={onLogout}>Sair</li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <CustomModal isOpen={isModalOpen} onClose={closeModal} >
        {modalContent === 'Meus dados' && <MeusDados restaurante={restaurante} token={token} />}
        {modalContent === 'Configurações' && <Configuracoes token={token} />}
      </CustomModal>
    </>
  );
};

export default Header;
