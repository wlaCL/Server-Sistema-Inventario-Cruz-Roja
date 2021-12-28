import { NextFunction, Request, Response } from "express"
import GenericError from "../models/errors/error";

export const CamposValidosBody = (req: Request, res: Response, next: NextFunction) =>{
    const {nombre = "", descripcion=""} = req.body;
    if(nombre === "" && descripcion ===""){
        const obj = new GenericError('nombre = ?, descripcion = ?', "No existen campos ha actualizar");
        return res.status(400).json({
            errors:obj.ErrorObjt
        })
    }
    next()
}