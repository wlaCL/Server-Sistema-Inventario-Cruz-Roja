import { Request, Response } from "express";
import {Persona, Usuario, Cuenta_Acceso} from '../associations/usuario.associations';
import { generarJWT } from '../helpers/generar_jwt';

export const login =async(req:Request, res:Response)=>{

    try{
        const {cedula, password} = req.body; 
        const persona:any = await Persona.findByPk(cedula); 

        if(!persona){
            return res.status(400).json({
                errors:{
                    ok: false, 
                    msg: "Usuario y/o contraseña no son válidos"
                } 
            });
        }

        console.log("soy la persona ", persona.cedula)

        if(!persona.estado){
            return res.status(400).json({
                errors:{
                    ok: false, 
                    msg: "Usuario y/o contraseña no son válidos"
                } 
            });
        }

        const usuario:any = await Usuario.findOne({
            where:{
                cedula: persona.cedula
            }
        });
        const cuenta:any =await Cuenta_Acceso.findByPk(usuario.id_usuario)        
        

        if(cuenta.contrasena!== password){
            return res.status(400).json({
                errors:{
                    ok: false, 
                    msg: "Usuario y/o contraseña no son válidos"
                }              
            });
        }

        const token = await generarJWT(persona.cedula);

        res.status(200).json({
            ok: true, 
            msg: "Acceso Exitóso", 
            persona, 
            token
        })
        

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors:{
                ok: false, 
                msg: "Ha ocurrido un error contáctate con el administrador"
            }
        })

    }
}