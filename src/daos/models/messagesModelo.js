import mongoose from "mongoose";
const messageCollection='message'
const messageEsquema=new mongoose.Schema({
    email: String,
    message: String
},{strict:true},{}) 

export const messageModelo= mongoose.model(messageCollection,messageEsquema)