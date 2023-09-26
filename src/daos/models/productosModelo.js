import mongoose from "mongoose";
const productosCollection='productos'
const productosEsquema=new mongoose.Schema({
    marca: String,
    modelo: String,
    precio: Number,
    cantidad: String,   
},{strict:true},{}) 

export const productosModelo= mongoose.model(productosCollection,productosEsquema)