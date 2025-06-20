import Usuarios from "../models/usuarios.js";
import jwt from "jsonwebtoken"

export const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const informacion = {id};
        jwt.sign(informacion, process.env.LLAVESECRETA, {
            expiresIn: "1h"
        }, (err, token) => {
            if (err){
                console.log(err);
                reject("No se pudo generar el token")
            }else {
                resolve(token)
            }
        })
    })
}

export const validarJWT = async (req, res, next)=>{
    const token= req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.LLAVESECRETA)
        
        let usuario = await Usuarios.findById(id);

        if(!usuario){
            return res.status(401).json({
                msg:"token no valido"  //usuario no existente 
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            msg:"token no valido"  //usuario con estado falso
        })
    }
}

import {validationResult} from "express-validator"

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty() ) {
        return res.status(400).json(errores);
    }

    next();
}

export {
    validarCampos
}