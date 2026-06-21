import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { useAutenticacion } from '../contextos/AuthContext';
import clienteApi from '../servicios/api';

const Medidas = () => {
  const { usuario, logout } = useAutenticacion();
  const navegar = useNavigate();
  const [medidas, setMedidas] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarMedidas = async () => {
      setCargando(true);
      try {
        // Intentamos cargar los productos del backend
        const respuesta = await clienteApi.get('/productos');
        setMedidas(respuesta.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Tu sesión ha expirado. Vuelve a iniciar sesión.');
          logout();
          navegar('/login');
        } else {
          setError('No se pudieron cargar los productos.');
        }
      } finally {
        setCargando(false);
      }
    };
    cargarMedidas();
  }, [logout, navegar]);

  const manejarCerrarSesion = () => {
    logout();
    navegar('/');
  };

  return (
    <Container className="py-5">
      <p>Medidas</p>
    </Container>
  );
};

export default Medidas;