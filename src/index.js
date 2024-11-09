import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración para obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve los archivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login', 'login.html'));
});

// Ruta para el archivo HTML en 'Main'
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main', 'index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
