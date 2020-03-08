const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors'); 

// crear el servidor 
const server = express();

// conectar a la base de datos
conectarDB();

//Habilitar cors
server.use(cors());
// Habilitar express.json
server.use(express.json({extended: true}));
// Puerto del servidor
const port = process.env.port || 4000;
//Importar Rutas
server.use('/api/usuarios', require('./routes/usuarios'));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/proyectos', require('./routes/proyectos'));
server.use('/api/tareas', require('./routes/tareas'));
// Arrancar el servidor
server.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})