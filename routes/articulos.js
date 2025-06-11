import Router from "express";
import httpArticulos from "../controllers/articulos.js";


const routes = Router()

routes.get("/", httpArticulos.obtenerArticulos)
routes.get("/:id", httpArticulos.obtenerArticulosId)
routes.post("/", httpArticulos.crearArticulos)
routes.put("/:id", httpArticulos.actualizarArticulos)
routes.delete("/:id", httpArticulos.eliminarArticulos)

export default routes