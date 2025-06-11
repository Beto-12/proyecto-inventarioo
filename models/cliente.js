import mongoose from "mongoose";

const clienteEsquema = new mongoose.Schema({
    codigoArticulo: {type:mongoose.Schema.Types.ObjectId,ref: 'Articulos', require: true},
    cedula: {type: String, uniqued: true},
    nombre: {type: String},
    apellido: {type: String},
    direccion: {type: String, require: true},
    email: {type: String, require: true},
    telefono: {type: Number, require: true}
})

export default mongoose.model("Clientes", clienteEsquema);