const Tarea = require("../models/Tareas");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crear una tarea
exports.crearTarea = async (req, res) => {
  // validar si hay errores
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    // extraer el proyecto y comprobar si existe
    const { proyectoId } = req.body;

    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuairo autenticado
    if (proyecto.autor.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Crear una nueva tarea
    let tarea = new Tarea(req.body);
    tarea.save();

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error"); // Error en el servidor
  }
};

// Obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    // extraer el proyecto y comprobar si existe
    const { proyectoId } = req.query;

    const proyecto = await Proyecto.findById(proyectoId);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuairo autenticado
    if (proyecto.autor.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // obtener las tareas
    const tareas = await Tarea.find({ proyectoId });
    res.json({ tareas });

  } catch (error) {
    console.log(error);
    res.status(500).send("HUBO UN ERROR");
  }
};

//Editar la tarea
exports.editarTarea = async(req,res)=>{
    try {
        // extraer el tarea y comprobar si existe
        const { proyectoId,nombre,estado } = req.body;
        
        // Comprobar si existe la tarea
        let tarea = await Tarea.findById(req.params.id)
        if(!tarea){
            return res.status(404).json({ msg: "No existe la tarea" });
        }
        // extraer proyecto
        const proyecto = await Proyecto.findById(proyectoId);
    
        // Revisar si el proyecto actual pertenece al usuairo autenticado
        if (proyecto.autor.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "No autorizado" });
        }
    
        //Crear un objeto con la nueva información
        const nuevaTarea ={};
        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado;

        // guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id},
            nuevaTarea,{new: true});
            res.json({tarea});
    
      } catch (error) {
        console.log(error);
        res.status(500).send("HUBO UN ERROR");
      }
}

// Eliminar Tarea
exports.eliminarTarea = async(req,res)=>{
    try {
        const tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        // extraer proyecto
        const {proyectoId} = req.query;
        const proyecto = await Proyecto.findById(proyectoId);
    
        // Revisar si el proyecto actual pertenece al usuairo autenticado
        if (proyecto.autor.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "No autorizado" });
        }

        //Eliminar Proyecto
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'ELIMINADO CORRECTAMENTE'});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
