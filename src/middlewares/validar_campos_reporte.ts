import { Request, Response, NextFunction } from "express";

import Trabaja from '../models/trabaja.model';

import Registro_Producto from '../models/registro_producto';

export const  ExistAuthorAmbulance = async(req:Request, res: Response, next: NextFunction)=>{
    const {placa, fecha} = req.body
    const cedula:any = req.user;
    const author = await Trabaja.findOne({
        where: {
            cedula,
            placa,
            fecha_inicio:fecha
        }
    });

    if(author){
        return res.status(400).json({
            ok: false, 
            msg: `Usted ya tiene un reporte en proceso para la ambulancia ${placa}`
        })
    }
    next();
}


export const existeRegistro = async (req:Request, res:Response, next: NextFunction)=>{
    const {id = "", id_reporte=""} = req.body; 
    const producto = await Registro_Producto.findOne({
        where:{
            id_producambu:id, 
            id_reporte
        }
    });

    if(producto){
       return res.status(400).json({
            ok: false, 
            msg: "El producto ya se encuentra registrado"
        })
    }
    next()
}