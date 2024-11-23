import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import auth from './routes/auth.routes.js'
import Usuarios from './routes/usuarios.routes.js'
import EstadoUsuario from './routes/EstadoUsuario.routes.js'
import Salas from './routes/Salas.routes.js'
import Especialidad from './routes/Especialidad.routes.js'
import Objetos from './routes/Objetos.routes.js'
import Pacientes from './routes/Pacientes.routes.js'
import Roles from './routes/Rol.routes.js'
import ControlHigiene from './routes/ControlHigiene.routes.js';
import Permisos from './routes/Permisos.routes.js';
import ControlLavado from './routes/ControlLavado.routes.js';
import PersonalMedico from './routes/PersonalMedico.routes.js';
import Dispositivos from './routes/Dispositivos.routes.js';
import Infeccion from './routes/Infeccion.routes.js';
import EstadoMonitoreo from './routes/EstadoMonitoreo.routes.js'; 

//import ControlLavado from '../client/src/pages/Mantenimientos/ControlLavado/ControlLavado.jsx'
//import Objetos from '../client/src/pages/Mantenimientos/Objetos/Objetos.jsx'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookie());

app.use('/api', ControlHigiene);
app.use('/api',auth);
app.use('/api',Usuarios);
app.use('/api',Salas);
app.use('/api',Especialidad);
app.use('/api',Objetos);
app.use('/api',EstadoUsuario);
app.use('/api',Pacientes);
app.use('/api',Roles);
app.use('/api',Permisos);
app.use('/api',ControlLavado);
app.use('/api',PersonalMedico);
app.use('/api',Dispositivos);
app.use('/api',Infeccion);
app.use('/api',EstadoMonitoreo);  


app.listen(3000);
console.log('Servidor corriendo en el puerto 3000');