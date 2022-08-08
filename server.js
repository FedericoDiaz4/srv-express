import express from 'express';
import Contenedor from './contenedor.js';

const PORT = 8080;
const app = express();
const archivo = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
    try {
        const productos = await archivo.getAll();
        return res.send(productos);   
    } catch (error) {
        console.log(error);
        return res.send({error:"No se encuentran productos"});
    }
});

app.get('/productoRandom', async (req,res) => {
    try {
        const prodRandom = await archivo.getById(Math.floor((Math.random() * 4) + 1));
        return res.send(prodRandom);   
    } catch (error) {
        console.log(error);
        return res.send({error:"No se encuentra el producto"});
    }
});


const server = app.listen(PORT, () => {
    console.log("Servidor levantado y escuchando en puerto: " + server.address().port);
});

server.on('error', error => {
    console.log("Error: " + error)
})