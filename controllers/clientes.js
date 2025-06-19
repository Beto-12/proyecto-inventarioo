import Clientes from "../models/cliente.js";

const httpClientes = {
    obtenerClientes: async (req, res) => {
        try {
            const clientes = await Clientes.find();
            res.json({ clientes });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los clientes" });
        }
    },
    obtenerClientesId: async (req, res) => {
        try {
            const { id } = req.params;
            const clientes = await Clientes.findById(id);
            res.json({ clientes });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar el cliente" });
        }
    },
    crearClientes: async (req, res) => {
        try {
            const { cedula, nombre, apellido, direccion, email, telefono } = req.body;
            const clientes = new Clientes({ cedula, nombre, apellido, direccion, email, telefono });
            await clientes.save();
            res.json({ msg: "Cliente creado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al crear el cliente" });
        }
    },
    actualizarClientes: async (req, res) => {
        try {
            const { id } = req.params;
            const { cedula, nombre } = req.body;
            const clientes = await Clientes.findByIdAndUpdate(id, {
                cedula,
                nombre,
            });
            res.json({ msg : "Cliente actualizado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al actualizar el cliente" });
        }
    },
    eliminarClientes: async (req, res) => {
        try {
            const { id } = req.params;
            const clientes = await Clientes.findByIdAndDelete(id);
            res.json({ msg : "Cliente Eliminado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al eliminar el cliente" });
        }
    },
};

export default httpClientes