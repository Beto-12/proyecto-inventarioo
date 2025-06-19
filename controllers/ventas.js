import Ventas from "../models/ventas.js";

import Articulos from "../models/articulos.js"

import { recomendarArticulos } from "../service/aiService.js";

const  httpVentas= {
    obtenerVentas: async (req, res) => {
        try {
            const ventas = await Ventas.find()
            .populate('items.articulo')  // Muestra los detalles de los articulo
            .populate('codigoClientes');  // Muestra los detalles del clientes
            res.json({ ventas });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los ventas" });
        }
    },
    obtenerVentasId: async (req, res) => {
        try {
            const { id } = req.params;
            const ventas = await Ventas.findById(id)
            .populate('items.articulo')
            .populate('codigoClientes');
            res.json({ ventas });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar las ventas " });
        }
    },
    crearVentas: async (req, res) => {
        try {
            const { items, codigoClientes, codigoVentas } = req.body;

            // Descontar stock de cada articulo
            for (const item of items) {
                const articulo = await Articulos.findById(item.articulo);
                if (!articulo) {
                    return res.status(400).json({ msg: `Articulo no encontrado: ${item.articulo}`});
                }
                if (articulo.cantidad < item.cantidad) {
                    return res.status(400).json({ msg: `Stock insuficiente para el artículo: ${articulo.nombre}`});
                }
                articulo.cantidad -= item.cantidad;
                await articulo.save();
            }

            // Creamos la venta
            const ventas = new Ventas({ items, codigoClientes, codigoVentas });
            await ventas.save();

            //const recomendaciones = await recomendarArticulos(ventas.items)
            res.json({ 
                msg: "Venta creada con exito",
                ventas
                //recomendaciones
            });
        } catch (error) {
            res.status(400).json({ msg: "Error al crear la venta" });
        }
    },
    actualizarVentas: async (req, res) => {
        try {
            const { id } = req.params;
            const { items, codigoClientes, codigoVentas } = req.body;
            await Ventas.findByIdAndUpdate(id, {
                items, codigoClientes, codigoVentas
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