import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProveedorAutenticacion } from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaProtegida';
import Login from './paginas/Login';
import Inicio from './paginas/Inicio';
import Panel from './paginas/Panel';
import Productos from './paginas/Productos';

 
function App() {
  return (
    // BrowserRouter habilita las rutas en toda la app.
    <BrowserRouter>
      {/* ProveedorAutenticacion envuelve todo para que CUALQUIER componente
          pueda leer el estado de autenticación. */}
      <ProveedorAutenticacion>
        <Routes>
          {/* Ruta PÚBLICA: accesible por todos. */}
          <Route path="/" element={<Inicio />} />
 
          {/* Ruta PÚBLICA: el propio formulario de login. */}
          <Route path="/login" element={<Login />} />
 
          {/* Ruta PROTEGIDA: si no estás logueado, te redirige a /login. */}
          <Route
            path="/panel"
            element={
              <RutaProtegida>
                <Panel />
              </RutaProtegida>
            }
          />
          <Route
            path="/productos"
            element={
              <RutaProtegida>
                <Productos />
              </RutaProtegida>
            }
          />
        </Routes>
      </ProveedorAutenticacion>
    </BrowserRouter>
  );
}
 
export default App;
