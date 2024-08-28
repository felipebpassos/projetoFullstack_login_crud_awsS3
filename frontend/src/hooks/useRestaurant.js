// src/hooks/useRestaurant.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useRestaurant = (token) => {
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurante/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurante(response.data);
      } catch (error) {
        console.error('Erro ao obter as informações do restaurante:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRestaurante();
    }
  }, [token]);

  return { restaurante, loading };
};

export default useRestaurant;
