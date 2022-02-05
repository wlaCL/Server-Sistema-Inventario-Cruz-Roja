import { Request, Response, NextFunction } from "express";
import Usuario from '../models/usuario.model';

export const isUserWeb = async(req:Request, res: Response, next:NextFunction)=>{
    const cedula:any = req.user;
    const usuario: any = await Usuario.findOne({
        where:{
            cedula
        }
    }); 

    if(usuario.roles_sistema != "user_web"){
       return  res.status(401).json({
            ok: false, 
            msg: "No cuentas con los permisos necesarios"
        });
    } 
    next()   
} 


export const isUserApp = async(req:Request, res: Response, next:NextFunction)=>{
    const cedula:any = req.user;
    const usuario: any = await Usuario.findOne({
        where:{
            cedula
        }
    }); 

    if(usuario.roles_sistema != "user_app"){
       return  res.status(401).json({            
            ok: false, 
            msg: "No cuentas con los permisos necesarios"
        });
    }  
    next()  

} 

