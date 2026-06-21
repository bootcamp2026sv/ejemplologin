import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/AuthContext';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
 
const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login, estaLogueado, cargando } = useAutenticacion();
  const navegar = useNavigate();
 
  // Si ya está logueado y entra a /login, lo mandamos al panel.
  if (estaLogueado) {
    return <Navigate to="/panel" replace />;
  }
 
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');
 
    const resultado = await login(usuario, clave);
    if (resultado.ok) {
      navegar('/panel'); // Lo mandamos al panel protegido.
    } else {
      setError(resultado.mensaje); // Mostramos el error.
    }
  };
 
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
 
          {error && <Alert variant="danger">{error}</Alert>}
 
          <Form onSubmit={manejarEnvio}>
            <Form.Group className="mb-3" controlId="usuario">
              <Form.Label>Usuario o Correo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                disabled={cargando}
              />
            </Form.Group>
 
            <Form.Group className="mb-3" controlId="clave">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
                disabled={cargando}
              />
            </Form.Group>
 
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
 
export default Login;
