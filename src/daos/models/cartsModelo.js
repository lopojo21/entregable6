import mongoose from "mongoose";
const cartsCollection='carts'
const cartsEsquema=new mongoose.Schema({
    modelo: [],
    precio: String,
    cantidad: String,
    precio: Number,
    
},{strict:true},{}) 

export const cartsModelo= mongoose.model(cartsCollection,cartsEsquema)