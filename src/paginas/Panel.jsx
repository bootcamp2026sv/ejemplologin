import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAutenticacion } from '../contextos/AuthContext';
import clienteApi from '../servicios/api';
 
const Panel = () => {
  const { usuario, logout } = useAutenticacion();
  const navegar = useNavigate();
  const [datosProtegidos, setDatosProtegidos] = useState(null);
  const [error, setError] = useState('');
 
  // Al cargar el Panel, hacemos una petición a un endpoint protegido.
  // Si el token es válido, el backend nos responde con datos.
  // Si NO es válido, el backend responde 401 y veríamos un error.
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // EJEMPLO: ajusta esta ruta a un endpoint real de tu backend.
        // Por ejemplo, '/clientes' o '/usuarios/perfil'.
        const respuesta = await clienteApi.get('/clientes');
        setDatosProtegidos(respuesta.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Tu sesión ha expirado. Vuelve a iniciar sesión.');
          // Opcional: cerrar sesión automáticamente.
          logout();
          navegar('/login');
        } else {
          setError('No se pudieron cargar los datos.');
        }
      }
    };
    cargarDatos();
  }, []);
 
  const manejarCerrarSesion = () => {
    logout();
    navegar('/');
  };
 
  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Body>
          <h1 className="mb-3">Panel Protegido</h1>
          <p className="lead">
            ¡Hola, <strong>{usuario?.username}</strong>! Estás en una zona
            que <strong>solo usuarios logueados</strong> pueden ver.
          </p>
 
          <hr />
 
          <h4>Demostración de petición protegida:</h4>
          {error && <Alert variant="warning">{error}</Alert>}
          {datosProtegidos ? (
            <pre className="bg-light p-3 rounded">
              {JSON.stringify(datosProtegidos, null, 2)}
            </pre>
          ) : (
            !error && <p>Cargando datos protegidos...</p>
          )}
 
          <hr />
 
          <Button variant="danger" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
 
export default Panel;
