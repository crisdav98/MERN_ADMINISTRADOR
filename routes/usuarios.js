// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controlers/usuarioController');
const {check} = require('express-validator');

// Crea un usuario
// api/ usuarios
router.post('/',
[
    check('nombre','El nombre es obligatorio!').not().isEmpty(),
    check('email', 'Agrega un E-mail válido').isEmail(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({min:6})
],
    usuarioController.crearUsuario
);

module.exports= router;