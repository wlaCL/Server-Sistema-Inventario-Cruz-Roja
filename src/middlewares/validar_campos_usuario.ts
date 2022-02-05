import { NextFunction, Request, response, Response} from "express";
import GenericError from '../models/errors/error';
import {Persona} from "../associations/usuario.associations";


export const AlmenosUnCampo = async(req: Request, res:Response, next:NextFunction)=>{
    const {nombre="", apellido="", rol="", estado=""} = req.body; 

    if(nombre =="" && apellido =="" && estado =="" && rol ==""){
        return res.status(422).json({
            ok: false, 
            msg: "No existen campos para actualizar"
        });
    }
    next();
}

