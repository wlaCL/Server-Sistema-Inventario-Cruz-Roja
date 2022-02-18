import { Request, Response } from "express";
//import Producto_Ambulancia from '../models/producto_ambulancia';
import {TProducto, Producto, Producto_Ambulancia, Categoria} from "../associations/producto.associations";
import { Op } from 'sequelize';

export const postProductoAmbulancia = async(req:Request, res:Response)=>{

    const {cant_ambulancia, id_producto, placa} = req.body

    try{
        const producto = await Producto_Ambulancia.create({
                cant_ambulancia, 
                id_producto, 
                placa, 
                stock: cant_ambulancia
        })

        if(!producto){
            return res.status(400).json({
                ok: false, 
                msg: "No se ha podido completar el registro", 
            })
        }
        res.status(200).json({
            ok: true, 
            msg: "Asignación exitósa", 
            producto
        })

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Se ha producido un error contáctate con el administrador"
        })
    }
}

export const deleteProductoAmbulancia = async (req:Request, res: Response)=>{
    const {id_producto = "", placa =""} = req.body;

    try{
      const producto_ambulancia = await Producto_Ambulancia.update({
          estado: false,
           }, {
               where:{
                   id_producto, 
                   placa, 
                   estado: true
               }
           }
    );

    res.status(200).json({
        ok: true, 
        msg: "Eliminación exitósa", 
        producto_ambulancia
    });
        
    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        })
    }
    
}


export const getProductosAmbulanciaNombre = async (req:Request, res: Response)=>{
    const {placa="", termino =""} = req.params;

    try{
        const data:any = await TProducto.findAll({
            include:[
                {
                    model: Categoria, 
                    attributes:['nombre'], 
                    where:{
                        estado:true, 
                        nombre:"Varios"
                    }
                },
               {
                   model: Producto,
                   attributes:['id_producto','fecha_caducidad','cantidad', 'estado'],
                   where:{
                       estado:true
                   },
                   include:[
                       {
                           model: Producto_Ambulancia, 
                           where:{
                               placa, 
                               estado:true
                           }

                       } 
                   ]
               }
            ],
            where:{
                nombre:{
                    [Op.or]:{
                        [Op.startsWith]:termino, 
                        [Op.endsWith]: termino, 
                        [Op.substring]: termino                       
                    }
                }, 
                estado:true,
            }
        });

        console.log(data)
        if(data.length == 0){
            return res.status(404).json({
                ok: false, 
                msg: "No hay regisros"
            })
        }    

        return res.status(200).json({
            ok: true, 
            msg: "Consulta éxitosa", 
            data
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            errors: {
                ok: false, 
                msg: "Ha ocurrido un errror contáctate con el administrador"
            }
        });
    };      
}


export const getProductosAmbulanciaID= async (req:Request, res: Response)=>{
    const {placa="", id=""} = req.params;

    try{
        const data:any = await TProducto.findAll({
           include:[
                {
                    model: Categoria, 
                    attributes:['nombre'], 
                    where:{
                        estado:true, 
                        nombre:{
                            [Op.not]: "Varios"
                        }
                    }
                },
               {
                   model: Producto,
                   attributes:['id_producto','fecha_caducidad','cantidad', 'estado'],
                   where:{
                       estado:true
                   },
                   include:[
                       {
                           model: Producto_Ambulancia, 
                           where:{
                               placa, 
                               estado:true
                           }

                       } 
                   ]
               }
            ],
            where:{
                id_tipoprod:id, 
                estado:true,
            }
        });
        
        console.log("me ejecute hasta el final"); 
        console.log(data);
        if(data.length == 0){
            return res.status(404).json({
                ok: false, 
                msg: "No hay regisros"
            })
        }    
      
        res.status(200).json({
            ok: true, 
            msg: "Consulta éxitosa", 
            data
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            errors: {
                ok: false, 
                msg: "Ha ocurrido un errror contáctate con el administrador"
            }
        });
    };      
}