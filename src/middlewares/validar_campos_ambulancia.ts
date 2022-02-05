import { Request, Response, NextFunction } from 'express';
import GenericError from "../models/errors/error";
export const validarCamposAmbulancia = async(req:Request, res:Response, next:NextFunction)=>{
    const {descripcion = "", num_vehiculo=""}:any = req.body;
    if(descripcion == "" && num_vehiculo =="" ){
        return res.status(400).json({
            ok: false, 
            msg: "No existen campos para actualizar"     
        });       
    }
    next();
}