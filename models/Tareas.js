const mongoose = require('mongoose');

const TareaShema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fecha:{
        type:Date,
        default: Date.now()

    },
    proyectoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Tarea',TareaShema);