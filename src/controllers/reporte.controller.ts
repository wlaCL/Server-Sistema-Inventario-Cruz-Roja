import {Trabaja} from '../associations/reporte.associations';

import { Request, Response } from "express";
import GenericError from '../models/errors/error';
import moment from 'moment';

export const postAuthorInventory = async(req:Request, res:Response)=>{

    const {placa="", cedula="", fecha="", rol=""} = req.body;
  
    try{
        const trabaja = await Trabaja.create({
            placa, 
            cedula, 
            fecha_inicio: moment(fecha, "YYYY-MM-DD").format(), 
            fecha_fin:  moment(fecha,"YYYY-MM-DD").format(), 
            rol
        });
    
        if(!trabaja){
            const obj = new GenericError('registro no exitoso', "no se pudo realizar el registro")
            res.status(400).json({
                errors: obj.ErrorObj
            });        
        }
    
        res.status(200).json({
            ok: true,
            msg: "registro existoso", 
            trabaja
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors:{
                ok: false, 
                msg: "Ha ocurrido un error contáctate con el administrador"
            }
        })
    };  
}


export const getReporte = async (req:Request, res:Response)=>{
    res.status(200).json({
        msg: "Soy el controlador para la obtencion del resporte"
    });
}