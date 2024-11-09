import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve los archivos estáticos
app.use('/',express.static(path.join(__dirname, './src/Login')));
app.use('/Inicio', express.static(path.join(__dirname, './src/Main')));

// Ruta principal
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'./src/Login/login.html'));
});

app.get('/Inicio',(req, res)=>{
    res.sendFile(path.join(__dirname,'./src/Main/index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
