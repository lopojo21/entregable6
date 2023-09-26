// en consola npm init -y
//NPM install -g nodemon
//npm install express
// import ProductManager from "../managers/productManager.js";
import { Router } from "express";
import {productosModelo} from "../daos/models/productosModelo.js"
import mongoose from "mongoose";
export const productoRouter=Router();


// const pManager = new ProductManager();
const products = [];

productoRouter.get('/',async(req,res)=>{
    res.setHeader('Content-Type','text/html');
    
    res.status(200).render('realTimeProducts');
    return res.status(201).json({productos});
})

productoRouter.get('/realTimeProducts',async(req,res)=>{
    const productos = await productosModelo.find()
        
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({productos});
});

productoRouter.post('/', async (req,res)=>{
    const producto= req.body;
    const productos = await productosModelo.find()
    let existe= await productosModelo.findOne({modelo:producto.modelo})
  
    if(existe) return res.status(400).json({error:`El producto ${producto.modelo} ya esta dado de alta`})
    try {
    let productoInsertado= await productosModelo.create(producto);
    res.status(201).json({productoInsertado});
    } catch (error) {
    res.status(500).json({error:'Error Inesperado',detalle:error})
    
    }    
    // server.emit('newProduct',productoInsertado,productos.toJSON());
    // return res.status(200).send({status:'success', message:'Producto creado'});
});


productoRouter.get('/:id', async(req,res) => {
    let id =req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'});
        
    try{
        const productosID = await productosModelo.find(id);    
        return res.status(200).json(productosID);  
    }catch(error){
        res.status(500).json({error:'Error Inesperado',detalle:error})
        }
    });

productoRouter.put('/:pid', async (req,res)=>{
    let id =req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'})
    // ↑↑↑↑↑↑↑↑↑↑↑↑ validacion de que la ID que modificamos es una id de mongoose
        let modifica= req.body

    if(!modifica.modelo || !modifica.precio) return res.status(400).json({error:'faltan datos'})

    let resultado = await productosModelo.updateOne({_id:id}, modifica)
    let existe= await productosModelo.findById(id)
    if(!existe) return res.status(404).json({error:`El producto con id ${id} es inexistente`})
    
    res.status(200).json({resultado})
});
    


productoRouter.delete('/:pid', async (req,res)=>{
    let id =req.params.pid
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({error:'id invalido'})
    
    let existe= await productosModelo.findById(id)
    let producto= await productosModelo.findById(id)
    if(!existe) return res.status(404).json({error:`El producto con id ${id} es inexistente`})
    try{
        let productos=await productosModelo.deleteOne({_id:id})
        return res.status(200).json({status:'success', message:'Product DELETED'})
    
    }catch(error){
            return res.status(404).json({error:'Erorr Inesperado', detalle: error})
        
    // server.emit('deleteProduct',producto.toJSON(),productos);
            }
        })
    



