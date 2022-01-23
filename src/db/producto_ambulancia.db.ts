import {Producto} from '../associations/producto.associations';
import Producto_Ambulancia from '../models/producto_ambulancia';


export const exiteProductoCaducidad = async(id ="")=>{
    const producto = await Producto.findOne({
        where:{
            id_producto: id, 
            disponibilidad: true
        }
    });
    if(!producto){
        throw new Error("No existen registros de la caducidad del producto");
    }
}


