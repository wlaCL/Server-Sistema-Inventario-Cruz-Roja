import { NextFunction, Request, Response} from "express";
import GenericError from '../models/errors/error';

//validar que se envie un rol valido 
export const rolValido = async(req:Request, res:Response, next:NextFunction)=>{
    const roles_validos = ['user_web', 'user_app'];
    const {rol=""} = req.body; 

    if(rol != ""){
        if(!roles_validos.includes(rol)){
            const obj = new GenericError(rol, "Rol no válido : [user_web, user_app]");
            return res.status(422).json({
                errors: obj.ErrorObjt
            });
        }
    }
    next();
}

//validar que se envie una contraseña valida
export const contrasenaValida = async(req:Request, res:Response, next:NextFunction)=>{
    const {contrasena ="", rol=""} = req.body; 
    if(rol !=""){
        if(contrasena == ""){
            const obj = new GenericError(contrasena, "Es necesario el campo contrasena");
            return res.status(422).json({
                errors: obj.ErrorObjt
            });
        }

        if(contrasena.length < 10){
            const obj = new GenericError(contrasena, "La contraseña debe al menos tener 10 caracteres");
            return res.status(422).json({
                errors: obj.ErrorObj
            });  
        }          
    }    
    next();    
}

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


