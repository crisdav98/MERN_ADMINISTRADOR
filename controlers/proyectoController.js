const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    // Crear un nuevoProyecto
    const proyecto = new Proyecto(req.body);
    // GUARDAR EL CREADOR VIA JWT
    proyecto.autor = req.usuario.id;
    // guardar proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    // Error en el servidor
    res.status(500).send("Hubor un error");
  }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async(req,res)=>{
  try {
    const proyectos = await Proyecto.find({autor: req.usuario.id});
    res.json({proyectos});
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error')
  }
}

// Actualizar un proyecto
exports.actualziarProyecto = async(req,res)=>{
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  // extraer la información del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if(nombre){
    nuevoProyecto.nombre = nombre
  }

  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);
    
    //SI EL PROYECTO EXISTE O NO
    if(!proyecto){
      return res.status(404).json({msg: 'Proyecto no encontrado'});
    }

    // Verificar el creador del proyecto
    if(proyecto.autor.toString() !== req.usuario.id){
      return res.status(401).json({msg: ' No autorizado '});
    }

    //actualizar
    proyecto = await Proyecto.findOneAndUpdate({_id:req.params.id}, { $set : nuevoProyecto},{new: true});

    res.json({proyecto});


  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
 }
}

// Eliminar un proyecto
exports.eliminarProyecto = async(req,res) =>{

  try {
    let proyecto = await Proyecto.findById(req.params.id)
    //SI EL PROYECTO EXISTE O NO
    if(!proyecto){
      return res.status(404).json({msg: 'Proyecto no encontrado'});
    }

    // Verificar el autor del proyecto
    if(proyecto.autor.toString() !== req.usuario.id){
      return res.status(401).json({msg: 'NO AUTORIZADO'});
    }

    // Eliminar proyecto
    await Proyecto.findOneAndRemove({_id: req.params.id});
    res.json({msg: 'Proyecto Eliminado'});


  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
}
