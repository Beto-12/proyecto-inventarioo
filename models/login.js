import mongoose from "mongoose";

const loginEsquema = new mongoose.Schema({
    email: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true},
    password: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true}
})

export default mongoose.model("Login", loginEsquema)