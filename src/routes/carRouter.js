import { Router } from "express";
import {productosModelo} from "../daos/models/productosModelo.js"
import { productoRouter } from "./productoRouter.js";
import mongoose from "mongoose";
import {cartsModelo} from "../daos/models/cartsModelo.js";

export const carRouter = Router();




carRouter.get('/', async (req,res)=>{
    const car=  await cartsModelo.find()
    if (car instanceof Error){return res
        .status(400)
        .send({status :"error" , menssage : `${car.menssage}`});
    } else{
        return res
        .status(201)
        .json({car})
        
    }

});

carRouter.post('/productos/:pid', async (req,res)=>{
        
    const idProd=req.params.pid;    
    const idCar =await cartsModelo.find()
    

    try{
        const producto= await productosModelo.findById(idProd);    
        const cProduct = await cartsModelo.create({
            modelo: producto.modelo,
            precio: producto.precio            
        });
        return res.status(400).json({cProduct});
    } catch(error){
        res.status(500).json({error:'Error Inesperado',detalle:error})
        }
    });

carRouter.put('/:cid/productos/:pid', async (req,res)=>{
    
    const idProd=req.params.pid;    
    const idCar =await cartsModelo.findById(req.params.cid)
    const Cars =await cartsModelo.find()

    if(!mongoose.Types.ObjectId.isValid(idCar)) return res.status(400).json({error:'id invalido'})
    
    let validaID= await cartsModelo.findOne({_id:{$eq:idCar._id}})
    if(!validaID) return res.status(400).json({error:`No existe carrito con la ID ${validaID._id}`})
    try{
        const producto= await productosModelo.findById(idProd);    
           
        const cProduct = await cartsModelo.updateOne({
            modelo: [producto.modelo,idCar.modelo],
            precio: producto.precio+idCar.precio
        });
        console.log(await cartsModelo.findOne({_id:{$eq:idCar._id}}))
        return res.status(400).json({cProduct});
    } catch(error){
        res.status(500).json({error:'Error Inesperado',detalle:error})
        }
});
