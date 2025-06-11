import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import articulos from "./routes/articulos.js";
import clientes from "./routes/cliente.js";
import usuarios from "./routes/usuarios.js"
import ventas from "./routes/ventas.js";

const app = express();

app.use(express.json())
app.use(express.static("public"))
app.use("/api/articulos", articulos)
app.use("/api/clientes", clientes)
app.use("/api/usuarios", usuarios)
app.use("/api/ventas", ventas)

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("Base de datos Conectada"));
});