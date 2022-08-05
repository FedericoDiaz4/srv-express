import express from 'express';
import Contenedor from './contenedor.js';

const PORT = 8080;
const app = express();
const archivo = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
    const productos = await archivo.getAll();
    res.send(productos);
});

app.get('/productoRandom', async (req,res) => {
    const prodRandom = await archivo.getById(Math.floor((Math.random() * 4) + 1));
    res.send(prodRandom);
});


const server = app.listen(PORT, () => {
    console.log("Servidor levantado y escuchando en puerto: " + server.address().port);
});

server.on('error', error => {
    console.log("Error: " + error)
})