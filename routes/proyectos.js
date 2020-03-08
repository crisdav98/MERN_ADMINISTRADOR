const express = require('express');
const router = express.Router();
const proyectoController = require('../controlers/proyectoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
// Crear Proyectos
// api/proyectos
router.post('/',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto);

// Obtener proyectos
router.get('/',
auth,
proyectoController.obtenerProyectos
);

// Actualziar proyectos
router.put('/:id',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty()
],
proyectoController.actualziarProyecto
);

router.delete('/:id',
auth,
proyectoController.eliminarProyecto);


module.exports = router;