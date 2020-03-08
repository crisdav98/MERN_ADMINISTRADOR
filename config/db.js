const mongoose =require('mongoose'); mongoose.set('useCreateIndex', true);

require('dotenv').config({path:'variables.env'});

const conectarDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB: CONEXIÓN EXITOSA!');
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app
    }
}
module.exports = conectarDB;