import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { useAutenticacion } from '../contextos/AuthContext';
import clienteApi from '../servicios/api';

const Productos = () => {
  const { usuario, logout } = useAutenticacion();
  const navegar = useNavigate();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true);
      try {
        // Intentamos cargar los productos del backend
        const respuesta = await clienteApi.get('/productos');
        setProductos(respuesta.data);
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
    cargarProductos();
  }, [logout, navegar]);

  const manejarCerrarSesion = () => {
    logout();
    navegar('/');
  };

  return (
    <Container className="py-5">
      <p>Productos</p>
    </Container>
  );
};

export default Productos;