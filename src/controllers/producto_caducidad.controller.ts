import { Request, Response} from 'express';
import {Op } from 'sequelize';
import {Producto} from '../associations/producto.associations';
import GenericError from '../models/errors/error';


export const postProductoCaducidad = async (req:Request, res: Response) => {
    const {id_tipoprod, fecha_caducidad, cantidad} = req.body; 

    try{
        const producto = await Producto.create({
            id_tipoprod,
            fecha_caducidad, 
            cantidad
        })
        res.status(201).json({
            ok:true, 
            msg: "Producto registrado exitósamente",
            producto 
        })
    }catch(error){
        console.log(error);
        const {name, errors}:any = error        
        if(name === "SequelizeValidationError"){
            const obj = new GenericError(errors[0].value, errors[0].message )
            return res.status(422).json({
               errors:obj.ErrorObjt
            });
        } else{
            return res.status(500).json({  
                errors: "Ha ocurrido un error contácte con el administrador"      
            }); 
        } 
    }
}

export const putProductoCaducidad = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {cantidad = ""} = req.body;
    console.log(cantidad)
    try{        
        const busqueda:any = await Producto.findOne({
            where: {
                id_producto:id
            }
        });
    
        const producto = await Producto.update({        
            cantidad:(cantidad!="")?cantidad:busqueda.cantidad
        },{
            where: {id_producto:id}
        });
        
        if(producto[0]==0){
            const obj = new GenericError('', 'No se registraron cambios'); 
            return res.status(400).json({
                errors: obj.ErrorObj
            })
        }
        res.status(200).json({
            ok: true,
            msg: "Actualiación exitósa", 
            producto 
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }   
}

export const deleteProductoCaducidad = async (req: Request, res: Response) => {
    const {id} = req.params; 
    const producto = await Producto.update({
        disponibilidad:false
    },{
        where:{
            id_producto:id
        }
    });

   res.status(200).json({
       ok: true, 
       msg: "Eliminación exitósa", 
       producto
   })
}

