import mongoose from "mongoose";

const ventasEsquema = new mongoose.Schema({
    codigoArticulos: {type: mongoose.Schema.Types.ObjectId, ref: 'Articulos', require: true},
    codigoClientes:{type:mongoose.Schema.Types.ObjectId, ref: 'Clientes', require: true},
    codigoVentas: {type: String, uniqued: true},
    fechaVenta: {type: Date, default:Date.now},
})

export default mongoose.model("Ventas", ventasEsquema);