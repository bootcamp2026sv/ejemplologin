import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/AuthContext';
 
const RutaProtegida = ({ children }) => {
  const { estaLogueado } = useAutenticacion();
 
  // Si NO está logueado, redirige a /login.
  // El componente Navigate es de react-router-dom y hace la redirección.
  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }
 
  // Si SÍ está logueado, muestra el contenido protegido.
  return children;
};
 
export default RutaProtegida;
