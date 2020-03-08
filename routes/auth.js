// Rutas para autenticar usuarios (inicio de sesión)
const express = require('express');
const router = express.Router();
const authController = require('../controlers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
//Autenticar usuario
// api/auth

router.post('/',
[
    check('email', 'Agrega un E-mail válido').isEmail(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({min:6})
],
authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)
module.exports= router;