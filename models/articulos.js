import mongoose from "mongoose";

const articuloEsquema = new mongoose.Schema({
    codigo: {type:String, unique: true},
    nombre: {type: String},
    cantidad: {type: Number, default:0},
    createdAt: {type: Date, default:Date.now},
    descripcion: {type: String},
    precio: {type: String, default: 0}
})

export default mongoose.model("Articulos", articuloEsquema);