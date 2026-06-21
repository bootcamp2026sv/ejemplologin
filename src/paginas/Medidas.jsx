import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAutenticacion } from '../contextos/AuthContext';
import clienteApi from '../servicios/api';

const Medidas = () => {
  const { usuario, logout } = useAutenticacion();
  const navegar = useNavigate();
  const [medidas, setMedidas] = useState([]); // para guardar la lista de las unidades de medida consultadas
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
//para editar, hay que guardar el id del elemento seleccionado
  const [editandoId, setEditandoId] = useState(null);

  //para registrar una unidad nueva, propiedades a recorger en el form
  const medida={
    codUnidad:'',
    descUnidad:''
  }

    const [cod, setCod] = useState('');
    const [desc, setDesc] = useState('');

  const [unidad, setUnidad] = useState(medida);
  //fin de registrar una nueva

//viene de la base de datos
  //const medidas1=[{ codUnidad: '59', descUnidad: 'Unidad', id: 1 },{ codUnidad: '99', descUnidad: 'Otros', id: 2 }]

  useEffect(() => {
 
    const cargarMedidas = async () => {
      setCargando(true);
      try {
        // Intentamos cargar los productos del backend
        const respuesta = await clienteApi.get('/UnidadDeMedidas');
        setMedidas(respuesta.data);

      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Tu sesión ha expirado. Vuelve a iniciar sesión.');
          logout();
          navegar('/login');
        } else {
          setError('No se pudieron cargar las medidas.');
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

    const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');

    // determinar si es actualizacion o registro nuevo

      if(editandoId){
          const respuesta = await clienteApi.put(`/UnidadDeMedidas/${editandoId}`,unidad);
          setEditandoId(null);
      }else{
          const respuesta = await clienteApi.post('/UnidadDeMedidas',unidad);
      }


 
    
    
  };


  //edicion
  const manejarEdicion = (medidaSeleccionada) => {
    
    setUnidad({
      codUnidad:medidaSeleccionada.codUnidad,
      descUnidad:medidaSeleccionada.descUnidad
    });

    setEditandoId(medidaSeleccionada.id);


  };


  return (
    <Container className="py-5">
      <p>Medidas registradas</p>

      <p>{error}</p>
<p className='text-primary'>{editandoId ? 'Los datos del formulario son para actualizar' : 'Datos para un nuevo registro'}</p>
       <Form onSubmit={manejarEnvio}>
                  <Form.Group className="mb-3" controlId="usuario">
                    <Form.Label>CODIGO</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el codigo"
                      value={unidad.codUnidad}
                      onChange={(e) => setUnidad({...unidad,codUnidad:e.target.value})}
                      required
                      
                    />
                  </Form.Group>
       
                  <Form.Group className="mb-3" controlId="clave">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      value={unidad.descUnidad}
                      onChange={(e) => setUnidad({...unidad,descUnidad:e.target.value})}
                      required
                     
                    />
                  </Form.Group>
       
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                  
                  >
                    {editandoId ? 'Actualizar' : 'Registrar'}
                  </Button>
                </Form>
      <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medidas.map((medida)=>(
              <tr key={medida.id}>
                <td>{medida.id}</td>
                <td>{medida.codUnidad}</td>
                <td>{medida.descUnidad}</td>
                <td>

                   <Button variant='primary' onClick={()=>manejarEdicion(medida)}>
                      Editar
                   </Button>

                </td>
              </tr>
            ))}
            
          </tbody>
      </table>
    </Container>
  );
};

export default Medidas;