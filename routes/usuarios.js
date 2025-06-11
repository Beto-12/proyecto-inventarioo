import Router from "express"
import httpUsuario from "../controllers/usuarios.js"
import { validarCampos, validarJWT } from "../middlewares/validar-jwt.js"

const routes = Router()


routes.get("/", [validarJWT, validarCampos], httpUsuario.obtenerUsuarios)
routes.get("/:id", [validarJWT, validarCampos], httpUsuario.obtenerUsuariosId)
routes.post("/",  httpUsuario.crearUsuarios)
routes.post("/login", httpUsuario.login)
routes.put("/:id", [validarJWT, validarCampos], httpUsuario.actualizarUsuarios)
routes.delete("/:id", [validarJWT, validarCampos], httpUsuario.eliminarUsuarios)

export default routes;
