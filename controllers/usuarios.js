import Usuarios from "../models/usuarios.js";

import { generarJWT } from "../middlewares/validar-jwt.js";

import bcryptjs from "bcryptjs";
// const bcryptjs = require('bcryptjs')

const  httpUsuario= {
    obtenerUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuarios.find();
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar los usuarios" });
        }
    },
    obtenerUsuariosId: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarios = await Usuarios.findById(id);
            res.json({ usuarios });
        } catch (error) {
            res.status(400).json({ msg: "Error al buscar el usuario" });
        }
    },
    crearUsuarios: async (req, res) => {
        try {
            const {cedula, nombre, apellido, direccion, telefono, email, password} = req.body;
            const usuarios = new Usuarios({cedula, nombre, apellido, direccion, telefono, email});

            const salt = bcryptjs.genSaltSync();
            usuarios.password = bcryptjs.hashSync(password, salt)
            console.log(usuarios.password);
            await usuarios.save();
            
            res.json({ msg: "Usuario creado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al crear el Usuario" });
        }
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        try {
            const usuario = await Usuarios.findOne({email});

            if (!usuario){
                return res.status(400).json({
                    msg: "Usuario no encontrado"
                });
            }
            if (usuario.estado===false){
                return res.status(400).json({
                    msg:"usuario inactivo"
                })
            }

            const validarPassword = bcryptjs.compareSync(password, usuario.password)
            if (!validarPassword){
                return res.status(400).json({
                    msg: "Contraseña incorrecta"
                });
            }

            const token = await generarJWT(usuario.id);

            res.json({
                msg: "Login exitoso",
                id: usuario._id,
                token
            })
        } catch (error) {
            res.status(500).json({
                msg: "Error en el servidor"
            });
        }
    },
    actualizarUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const { email, password, nombre,  apellido, direccion, cedula, telefono} = req.body;
            const usuarios = await Usuarios.findByIdAndUpdate(id, {
                email,
                password,
                nombre, 
                apellido, 
                direccion,
                cedula,
                telefono
            });
            res.json({ msg: "Usuario actualizado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al actualizar el usuario" });
        }
    },
    eliminarUsuarios: async (req, res) => {
        try {
            const { id } = req.params;
            const usuarios = await Usuarios.findByIdAndDelete(id);
            res.json({ msg: "Usuario eliminado con exito" });
        } catch (error) {
            res.status(400).json({ msg: "Error al eliminar el usuario" });
        }
    },
};

export default httpUsuario;