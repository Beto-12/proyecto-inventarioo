import mongoose from "mongoose";

const clienteEsquema = new mongoose.Schema({
    cedula: {type: String, unique: true},
    nombre: {type: String},
    apellido: {type: String},
    direccion: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    compras: [{type: mongoose.Schema.Types.ObjectId, ref: "Ventas"}]  // Historial de compras
})

export default mongoose.model("Clientes", clienteEsquema);