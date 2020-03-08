const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // extraer email
  const { email, password } = req.body;

  try {
    // Consultar si existe el email ingresado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: " EL USUARIO NO EXISTE..!" });
    }
    // revisar password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "CONTRASEÑA INCORRECTA" });
    }

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000 // segundos 
      },
      (error, token) => {
        if (error) throw error;

        // Mensaje de confirmación
        res.json({ token });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(400).send("Error al autenticar el usuario");
  }
};

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async(req,res)=>{

  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json({usuario});
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}
