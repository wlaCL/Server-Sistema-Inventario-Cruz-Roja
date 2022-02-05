import { Request, Response } from "express";
import {Producto_Ambulancia, Producto} from '../associations/producto.associations'; 
import {Registro_Producto} from '../associations/inventario.associations';



export const postRegistroProducto = async(req: Request, res: Response)=>{
    const {id="", id_reporte ="", cant_consumo=0, carga = 0}:any = req.body; 
    try{
        
        const producto:any= await Producto_Ambulancia.findOne({
            where:{
                id_producambu: id, 
                estado: true
            }
        }); 

        
        if(!producto){
           return res.status(404).json({
               oK: false, 
               msg: "No se han encontrado registros con los datos ingresados"
            });
        }

        if(producto.stock == 0 || producto.stock < cant_consumo){  
            return res.status(400).json({
                ok: false, 
                msg: `No existe stock disponible para el registro. Stock disponible: ${producto.stock}`
            });
        }        

        const registro:any = await Registro_Producto.create({
            id_producambu: producto.id_producambu,
            cant_consumo, 
            carga,
            id_reporte
        });

       await Producto_Ambulancia.update({
            stock: producto.stock - cant_consumo + carga
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
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }
}

