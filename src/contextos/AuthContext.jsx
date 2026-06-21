import { createContext, useState, useContext, useEffect } from 'react';
import { iniciarSesion as loginApi, cerrarSesion as logoutApi } from '../servicios/authService';
 
// 1. Creamos el contexto (un "canal" de datos compartidos).
const ContextoAutenticacion = createContext();
 
// 2. Hook personalizado: permite usar el contexto fácilmente desde cualquier componente.
// En lugar de usar useContext(ContextoAutenticacion) cada vez, usa useAutenticacion().
export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de un ProveedorAutenticacion');
  }
  return contexto;
};
 
// 3. El "Proveedor": un componente que ENVUELVE la app y provee los datos del contexto.
export const ProveedorAutenticacion = ({ children }) => {
  // Estado del usuario. Inicialmente lo leemos de localStorage (por si recargó la página).
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });
 
  // Indicador de carga.
  const [cargando, setCargando] = useState(false);
 
  // Función para iniciar sesión. La llama el componente Login.
  const login = async (usuarioIngresado, claveIngresada) => {
    setCargando(true);
    try {
      const datos = await loginApi(usuarioIngresado, claveIngresada);
      // datos trae: { accessToken, username, email, ... } según la api desarrollada.
      const datosUsuario = {
        token: datos.accessToken,
        username: datos.username,
        email: datos.email,
      };
      // Guardamos en localStorage para que la sesión sobreviva a recargas.
      localStorage.setItem('token', datos.accessToken);
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      setUsuario(datosUsuario);
      return { ok: true };
    } catch (error) {
      // Si el backend devuelve 401, llegará aquí.
      if (error.response && error.response.status === 401) {
        return { ok: false, mensaje: 'Usuario o contraseña incorrectos.' };
      }
      return { ok: false, mensaje: 'Error al conectar con el servidor.' };
    } finally {
      setCargando(false);
    }
  };
 
  // Función para cerrar sesión.
  const logout = () => {
    logoutApi(); // Limpia localStorage.
    setUsuario(null);
  };
 
  // Los datos que cualquier componente podrá leer.
  const valor = {
    usuario,           // null si NO está logueado, o un objeto con datos si SÍ.
    estaLogueado: !!usuario, // true/false (más fácil de usar).
    login,             // función para iniciar sesión.
    logout,            // función para cerrar sesión.
    cargando,          // true mientras se hace una petición de login.
  };
 
  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};
