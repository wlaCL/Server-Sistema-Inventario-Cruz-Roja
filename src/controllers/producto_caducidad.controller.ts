import { Request, Response} from 'express';
import {Op } from 'sequelize';
import {Producto, Producto_Ambulancia} from '../associations/producto.associations';



export const postProductoCaducidad = async (req:Request, res: Response) => {
    const {id_tipoprod, fecha_caducidad, cantidad} = req.body; 

    try{
        const producto = await Producto.create({
            id_tipoprod,
            fecha_caducidad, 
            cantidad
        })
        res.status(200).json({
            ok:true, 
            msg: "Producto registrado exitósamente",
            producto 
        })
    }catch(error){
        console.log(error);
       res.status(500).json({
           ok: false, 
           msg: "Ha ocurrido un error contáctate con el administrador"
       })
    }
}

export const putProductoCaducidad = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {cantidad = ""} = req.body;
    try{        
        const busqueda:any = await Producto.findOne({
            where: {
                id_producto:id
            }
        });

        const registros_ambulancia:any = await Producto_Ambulancia.findAll({
            where:{
                id_producto: id, 
                estado:true
            }
        }); 
        console.log(registros_ambulancia);
        if(registros_ambulancia != 0){
            return res.status(400).json({
                ok: false, 
                msg: "No es posible actualizar la cantidad"
            });
        }
    
        const producto = await Producto.update({        
            cantidad:(cantidad!="")?cantidad:busqueda.cantidad
        },{
            where: {id_producto:id}
        });
        
        if(producto[0]==0){           
            return res.status(400).json({
               ok: false, 
               msg: "No se registraron cambios"
            });
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
        estado:false
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


