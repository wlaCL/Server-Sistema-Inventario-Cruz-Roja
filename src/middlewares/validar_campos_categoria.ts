import { NextFunction, Request, Response } from "express"
import GenericError from "../models/errors/error";

export const CamposValidosBody = (req: Request, res: Response, next: NextFunction) =>{
    const {nombre = "", descripcion=""} = req.body;
    if(nombre === "" && descripcion ===""){
        return res.status(400).json({
            oK: false, 
            msg: "No existen campos para actualizar"
        })
    }
    next()
}