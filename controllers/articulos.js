import Articulos from "../models/articulos.js";

const httpArticulos = {
    obtenerArticulos: async (req, res) => {
        try {
            const articulos = await Articulos.find();
            res.json({ articulos });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los articulos" });
        }
    },
    obtenerArticulosId: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const articulo = await Articulos.findById(id);
            res.json({ articulo });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar el articulo" });
        }
    },
    crearArticulos: async (req, res) => {
        try {
            
            const { codigo, nombre } = req.body;
            console.log(codigo,nombre);
            const articulo = new Articulos({ codigo, nombre });
            await articulo.save();
            res.json({ msg: "Creado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al guardar el articulo" });
        }
    },
    actualizarArticulos: async (req, res) => {
        try {
            const { id } = req.params;
            const { codigo, nombre } = req.body;
            const articulos = await Articulos.findByIdAndUpdate(id, {
                codigo,
                nombre,
            });
            res.json({ msg: "Actualizado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al actualizar los articulos" });
        }
    },
    eliminarArticulos: async (req, res) => {
        try {
            const { id } = req.params;
            const articulos = await Articulos.findByIdAndDelete(id);
            res.json({ msg: "Eliminado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar la articulos" });
        }
    },
};

export default httpArticulos