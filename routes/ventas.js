import Router from "express"
import httpVentas from "../controllers/ventas.js"

const routes = Router()

routes.get("/", httpVentas.obtenerVentas)
routes.get("/:id", httpVentas.obtenerVentasId)
routes.post("/", httpVentas.crearVentas)
routes.put("/:id", httpVentas.actualizarVentas)
routes.delete("/:id", httpVentas.eliminarVentas)

export default routes;