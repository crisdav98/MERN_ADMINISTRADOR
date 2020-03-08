const express = require('express');
const router = express.Router();
const tareaController = require('../controlers/tareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Crear tareas
//api/tareas
router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
    ],
    tareaController.crearTarea
);

// Obtener tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Editar tarea
router.put('/:id',
    auth,
    tareaController.editarTarea
);

// Eliminar una tarea
router.delete('/:id',
auth,
tareaController.eliminarTarea);

module.exports = router;