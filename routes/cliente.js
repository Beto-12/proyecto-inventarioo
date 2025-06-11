import Router from "express"
import httpClientes from "../controllers/clientes.js"

const routes = Router()

routes.get("/", httpClientes.obtenerClientes)
routes.get("/:id", httpClientes.obtenerClientesId)
routes.post("/", httpClientes.crearClientes)
routes.put("/:id", httpClientes.actualizarClientes)
routes.delete("/:id", httpClientes.eliminarClientes)

export default routes;