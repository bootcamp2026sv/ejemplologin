import clienteApi from './api';
 
// Función para iniciar sesión.
// Recibe usuario y contraseña.
// Devuelve un objeto con { token, username, email, ... } si todo sale bien.
// Lanza un error si las credenciales son incorrectas.
export const iniciarSesion = async (usuario, clave) => {
  const respuesta = await clienteApi.post('/auth/login', {
    usernameOrEmail: usuario,
    password: clave,
  });
  return respuesta.data;
};
 
// Función para cerrar sesión.
// Limpia el localStorage y notifica al backend.
export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};
