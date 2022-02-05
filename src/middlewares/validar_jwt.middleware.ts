import jwt from 'jsonwebtoken';
import { Persona } from '../models/models';
import { NextFunction,Response, Request} from "express";

export const validarJWT = async(req:Request, res:Response, next:NextFunction)=> {
    //const token = req.headers('x-token');
    const token = req.header('x-token');
    let identificador:any;
    if(!token){
        return res.status(401).json({
            errors:{
                ok: false, 
                msg: "No hay token en la petición"                
            }
        });
    }
   

    try{
        console.log('1');
        let id: any; 

        try{
            id = jwt.verify(token, 'q7497437_U&#UEOUEW@$%');
            const{cedula} = id;
            identificador = cedula;
           
        }catch(error){
            return res.status(401).json({
                errors:{
                    ok: false, 
                    msg: "Token no válido"
                }
            });
        }
      
        req.user = identificador;
        const usuario:any = await Persona.findByPk(identificador);
        if(!usuario){
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }
        
        if(!usuario.estado){
            return res.status(401).json({
                errors:{
                    ok: false, 
                    msg: "token no valido"                
                }
            });
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            errors:{
                ok:false, 
                msg:"Ha ocurrido un error contáctate con el administrador"
            }
        })

    }
    next();
}

