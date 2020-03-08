const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

// como primer parámetro se pasa el nombre del modelo
// y como 2do se pasa el schema
// con la función de mongooose se dice que se va a registrar el modelo usuario 
// con el schema que se creó
module.exports = mongoose.model('Usuario', UsuariosSchema);