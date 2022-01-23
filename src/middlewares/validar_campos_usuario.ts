import { NextFunction, Request, Response} from "express";
import GenericError from '../models/errors/error';


export const tamanoContrasena = async(req:Request, res:Response, next:NextFunction) =>{
    const {contrasena=""} = req.body;

        if(contrasena != ""){
            if(contrasena.length < 10){
                const obj = new GenericError(contrasena, "La contraseña debe al menos tener 10 caracteres");
                return res.status(422).json({
                    errors: obj.ErrorObj
                });  
        }              
    }
    next();    
}

export const AlmenosUnCampo = async(req: Request, res:Response, next:NextFunction)=>{
    const {nombre="", apellido="", rol="", estado=""} = req.body; 

    if(nombre ==="" && apellido ==="" && estado ==="" && rol === ""){
        const obj = new GenericError(" nombre = ?, apellido = ?, rol = ?, estado = ? ", "No se detecto datos actualizar");
        return res.status(422).json({
            errors: obj.ErrorObj
        });
    }
    next();
}


export const  validarCedula = async(req:Request, res: Response) =>{
    const {cedula} = req.body;

    
}