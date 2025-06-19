import mongoose from "mongoose";

const itemsEsquema = new mongoose.Schema({
    articulo: {type: mongoose.Schema.Types.ObjectId, ref: "Articulos", required: true},
    cantidad: {type: Number, requerid: true, min: 1},
    categoria: {type: String, requerid: true}
})

const ventasEsquema = new mongoose.Schema({
    items: [itemsEsquema],
    codigoClientes:{type:mongoose.Schema.Types.ObjectId, ref: 'Clientes', required: true},
    codigoVentas: {type: String, unique: true},
    fechaVenta: {type: Date, default:Date.now},
})

export default mongoose.model("Ventas", ventasEsquema);