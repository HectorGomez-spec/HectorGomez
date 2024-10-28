import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import auth from './routes/auth.routes.js'
import Usuarios from './routes/usuarios.routes.js'
import EstadoUsuario from './routes/EstadoUsuario.routes.js'


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookie());

app.use('/api',auth);
app.use('/api',Usuarios);
app.use('/api',EstadoUsuario);


app.listen(3000);
console.log('Servidor corriendo en el puerto 3000');