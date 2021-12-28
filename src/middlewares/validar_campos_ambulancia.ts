import { Request, Response, NextFunction } from 'express';
import GenericError from "../models/errors/error";
export const validarCamposAmbulancia = async(req:Request, res:Response, next:NextFunction)=>{
    const {descripcion = "", num_vehiculo=""}:any = req.body;
    if(descripcion == "" && num_vehiculo =="" ){
        const obj = new GenericError('num_vehiculo = ?, descripcion = ?', 'No existe información para actualizar')
        return res.status(400).json({
            errors: obj       
        });       
    }
    next();
}