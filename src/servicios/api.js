import axios from 'axios';
 
// Leemos la variable de entorno. Si está vacía, usamos ruta relativa (activa el proxy).
const URL_BASE = import.meta.env.VITE_API_URL || '';
 
// Creamos UNA instancia de axios que usaremos en toda la app.
const clienteApi = axios.create({
  baseURL: `${URL_BASE}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// --- INTERCEPTOR DE REQUEST ---
// Esta función se ejecuta ANTES de cada petición que se haga con `clienteApi`.
// Su trabajo: si hay un token guardado, agregarlo al header Authorization.
clienteApi.interceptors.request.use(
  (configuracion) => {
    const token = localStorage.getItem('token');
    if (token) {
      configuracion.headers.Authorization = `Bearer ${token}`;
    }
    return configuracion;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
export default clienteApi;
