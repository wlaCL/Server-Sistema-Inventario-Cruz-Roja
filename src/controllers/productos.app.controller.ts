import { Request, Response } from "express";
import { Producto, TProducto } from "../associations/producto.associations";
import Producto_Ambulancia from '../models/producto_ambulancia';

// Crear un producto desde el la app movil 
export const crearProductoApp = async(req:Request, res: Response)=>{
    try{

        const {placa="", nombre = "", cantidad = "", id = "", tipo="", descripcion=""}= req.body;
    
        const tipo_producto:any = await TProducto.create({
            id_categoria: id, 
            nombre, 
            tipo,
            descripcion,
            can_minima: 0           
        });

        const producto:any = await Producto.create({
            id_tipoprod: tipo_producto.id_tipoprod, 
            cantidad
        });        
        const producto_ambulancia = await Producto_Ambulancia.create({
            id_producto: producto.id_producto,
            placa,
            cant_ambulancia: cantidad, 
            stock: cantidad                  
        });   

    
        res.status(200).json({
            ok: true, 
            msg: "Producto creado exitósamente"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
           ok: false, 
            msg: "Ha ocurrido un error en el servidor"
        }); 
    }   
} 


