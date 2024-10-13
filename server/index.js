import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookie());


app.listen(3000);
console.log('Servidor corriendo en el puerto 3000');