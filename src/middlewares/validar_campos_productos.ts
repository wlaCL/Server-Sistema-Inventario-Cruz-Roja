import { Request, Response, NextFunction } from "express";
import GenericError from '../models/errors/error';

export const validarTipoUnidad = (req:Request, res: Response, next:NextFunction) =>{
    const tiposUnidad = ["caja", "unidad"];

    const {tipo, medida} = req.body; 
    if (tipo == "Insumo Medico"){
        if(!tiposUnidad.includes(medida)){
            const obj = new GenericError("medida", "Es necesario agregar unidad de medida (medida)")
            return res.status(400).json({
                errors: obj.ErrorObjt
            });
        }
    }
    next()

}

export const validarCantidadEquipos = async(req:Request, res:Response, next:NextFunction)=>{
    const {tipo="", cantidad =""} = req.body; 

    if(tipo == "Equipo" && cantidad=="" ){
        const obj = new GenericError('cantidad', "La cantidad es obligatoria");
        return res.status(400).json({
            errors: obj.ErrorObjt            
        });
    }
    next();
}