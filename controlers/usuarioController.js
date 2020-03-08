const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, res) => {

  // Revisar si hay errores
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errores: errors.array()});
  }
  
  //Extraer email y password
  const { emai, password } = req.body;

  try {
    // Revisar que el usuario a registrarse sea único
    let usuario = await Usuario.findOne({ emai }); // con findOne Mongo va a hacer una consulta u buscar si hay algún registro más con ese nombre
    if (usuario) {
      return res.status(400).json({msg: ' EL USUARIO YA EXISTE..!'});
    }
    
    // crea el nuevo usuario
    usuario = new Usuario(req.body);
    
    // Hashear el password
    //generamos primero un salt que permite generar un hash único
    const salt = await bcryptjs.genSalt(10); 
    usuario.password = await bcryptjs.hash(password,salt);
    
    // guardar usuario
    await usuario.save();

    // Crear y firmar el JWT
    const payload = {
      usuario:{
        id: usuario.id
      }
    };

    // Firmar el JWT
    jwt.sign(payload, process.env.SECRETA,{
      expiresIn: 3600000 // segundos
    }, (error,token)=>{
      if(error) throw error;

      // Mensaje de confirmación
      res.json({token});
    });

  } catch (err) {
    console.log(err);
    res.status(400).send("Error al Guardar el usuario");
  }
};
