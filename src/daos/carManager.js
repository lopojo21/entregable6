import { Console } from 'console';
import {default as fsWithCallbacks} from 'fs'
const fs = fsWithCallbacks.promises

class carManager {
  id = 1
	constructor(){
  	this.cars = [];
    this.path = `./src/data/productos.json`;
    this.cars= `./src/data/car.json`
    }

  async getProducts(){
    try{
		const carritosArchivo = await fs.readFile(this.cars,"utf-8");
    return JSON.parse(carritosArchivo);
    
    } catch(e){
			await fs.writeFile(this.cars,"[]");
      return "No Existe el archivo";
    }
	};

  async addCar(idCar, idProducto){
    try{
      const carritosArchivo= await fs.readFile(this.cars,"utf-8");
      let newCar= JSON.parse(carritosArchivo);
      
      const validacion = newCar.find((p) => p.idCar=== idCar);
       if(validacion){
        throw new Error ("La ID ya esta en uso.")
      }
      if(!(idCar = null) || validacion){      
        const ultimoCarrito= newCar.length -1;
       parseInt(ultimoCarrito);
        // console.log(ultimoCarrito)
        newCar.push({
          idCar: ultimoCarrito + 1,
          products: [idProducto]
          });
    
          await fs.writeFile(this.cars, JSON.stringify(newCar,2));
          return `Carrito Creado con id ${ultimoCarrito + 1}`
      }     
      newCar.push({
      idCar: idCar,
      products: [idProducto]
      });

      await fs.writeFile(this.cars, JSON.stringify(newCar,2));
      return "Carrito Creado."

    }catch(e) {
      console.log ( idCar, idProducto);
      throw new Error(e)
    }
};

  async getProductByID(id){
try{
    const carritosArchivo = await fs.readFile(this.cars ,"utf-8");
      let idbusqueda= JSON.parse(carritosArchivo);
      const busquedaProducto = idbusqueda.find((p)=> p.id === id);

      if(!busquedaProducto){
        return idbusqueda[id]; 
      }
      else{
        // console.log(busquedaProducto);
        throw new Error("No se encontro producto");
      }
    }catch(e){
      throw new Error(e);
    }

  };

  async updateProduct(idCar, product){
    try{
    const carritosArchivo = await fs.readFile(this.cars,"utf-8");
    let cars= JSON.parse(carritosArchivo);
    
    cars[idCar].products.push(product);


    console.log(cars);
    console.log(idCar);
    await fs.writeFile(this.cars, JSON.stringify(cars,null,2));

    return "se actualizo producto."
  }catch(e){
    throw new Error(e);
  };
};
  
async deleteProduct(id){
    try{
      const productArchivo = await fs.readFile(this.path,"utf-8");
      let products= JSON.parse(productArchivo);

      const idProducto = products.findIndex((p)=> p.id === id);
      if(!idProducto){
        throw new Error("No existe producto");
      }
      const borrarProducto= products.filter((p)=> p.id !== id);
      await fs.writeFile(this.path, JSON.stringify(borrarProducto,null,2));
    return "Producto Eliminado."
    }catch(e){
      throw new Error(e);
    }

  };
};
const generador = async () => {
  console.log(await pm.addProducts(producto1))
};

const pm = new carManager;
pm.getProductByID(1);
export default carManager;
