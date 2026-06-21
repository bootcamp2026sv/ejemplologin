import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAutenticacion } from '../contextos/AuthContext';
 
const Inicio = () => {
  const { estaLogueado } = useAutenticacion();
 
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Bienvenido a la Aplicación</h1>
      <p className="text-center lead">
        Esta es una página <strong>pública</strong>. Cualquiera puede verla,
        sin necesidad de iniciar sesión.
      </p>
 
      <div className="text-center mt-4">
        {estaLogueado ? (
          <Link to="/panel" className="btn btn-success">
            Ir al Panel (logueado)
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </Container>
  );
};
 
export default Inicio;
