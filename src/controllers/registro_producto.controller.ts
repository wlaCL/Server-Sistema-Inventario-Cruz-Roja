import { Request, Response } from "express";
import {Producto_Ambulancia, Producto} from '../associations/producto.associations'; 
import {Registro_Producto} from '../associations/inventario.associations';
import GenericError from '../models/errors/error';



export const postRegistroProducto = async(req: Request, res: Response)=>{
    const {id_producto, placa, fecha, cant_consumo}:any = req.body; 
    try{
        const producto:any= await Producto_Ambulancia.findOne({
            where:{
                id_producto, 
                placa, 
                estado: true
            }
        }); 

        
        if(!producto){
             const obj = new GenericError("No existen registros",  `No se han encontrado registros con los datos ingresados`)
           return res.status(404).json({
               errors: obj.ErrorObjt
            });
        }
        console.log(producto);

        if(producto.stock == 0 || producto.stock < cant_consumo){  
            const obj = new GenericError("Stock", `No existe stock disponible para el registro. Stock disponible:  ${producto.stock}`)
            return res.status(400).json({
                    errors: obj.ErrorObjt
            });
        }        

        const registro:any = await Registro_Producto.create({
            id_producambu: producto.id_producambu,
            placa, 
            fecha_registro: fecha, 
            cant_consumo
        });

       await Producto_Ambulancia.update({
            stock: producto.stock - cant_consumo
       },{
           where:{
               id_producambu: producto.id_producambu               
           }
       });
       
        return res.status(201).json({
            ok: true, 
            msg: "Registro éxitoso", 
            registro
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors:{
                ok: false, 
                msg: "Ha ocurrido un error contáctate con el administrador"
            }
        });
    }
}

