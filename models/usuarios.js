import mongoose from "mongoose";

const usuarioEsquema = new mongoose.Schema({
    cedula:{ type:String, uniqued:true},
    nombre:{type:String},
    apellido:{type:String},
    direccion:{type:String, required:true},
    telefono:{type:Number, required:true},
    email:{type:String ,required:true},
    password:{type:String ,required:true}
})

export default mongoose.model("Usuarios", usuarioEsquema);
