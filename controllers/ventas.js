import Ventas from "../models/ventas.js";

const  httpVentas= {
    obtenerVentas: async (req, res) => {
        try {
            const ventas = await Ventas.find();
            res.json({ ventas });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los ventas" });
        }
    },
    obtenerVentasId: async (req, res) => {
        try {
            const { id } = req.params;
            const ventas = await Ventas.findById(id);
            res.json({ ventas });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar las ventas " });
        }
    },
    crearVentas: async (req, res) => {
        try {
            const {  codigoVentas } = req.body;
            const ventas = new Ventas({ codigoVentas });
            await ventas.save();
            res.json({ msg: "Venta creada con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al crear la venta" });
        }
    },
    actualizarVentas: async (req, res) => {
        try {
            const { id } = req.params;
            const { codigoVentas } = req.body;
            const ventas = await Ventas.findByIdAndUpdate(id, {
                codigoVentas
            });
            res.json({ msg: "Venta actualizada con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al actualizar las ventas " });
        }
    },
    eliminarVentas: async (req, res) => {
        try {
            const { id } = req.params;
            const ventas = await Ventas.findByIdAndDelete(id);
            res.json({ msg: "Venta eliminada con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al eliminar las ventas" });
        }
    },
};

export default httpVentas