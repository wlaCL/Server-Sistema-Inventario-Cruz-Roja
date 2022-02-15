import { Request, Response } from "express";
import {Persona, Usuario, Cuenta_Acceso} from '../associations/usuario.associations';
import { generarJWT } from '../helpers/generar_jwt';
import bycript from 'bcryptjs';

export const loginApp =async(req:Request, res:Response)=>{

    try{
        const {cedula, password, dispositivo} = req.body; 
        const persona:any = await Persona.findByPk(cedula); 

        if(!persona){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }


        if(!persona.estado){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }

        const usuario:any = await Usuario.findOne({
            where:{
                cedula: persona.cedula
            }
        });

        if (!usuario){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }

        if(usuario.roles_sistema != "user_app"){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos" 
            });
        }

        const cuenta:any =await Cuenta_Acceso.findByPk(usuario.id_usuario)        
        const validPassword =   bycript.compareSync(password, cuenta.contrasena);

        if(!validPassword){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"            
            });
        }

        const token = await generarJWT(persona.cedula);
        await Usuario.update({
            dispositivo
        },{
            where:{
                cedula
            }
        });

        res.status(200).json({
            ok: true, 
            msg: "Acceso Exitóso", 
            persona, 
            token
        })
        

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        })

    }
}


export const loginWeb =async(req:Request, res:Response)=>{

    try{
        const {cedula, password} = req.body; 
        const persona:any = await Persona.findByPk(cedula); 

        if(!persona){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }
       
        if(!persona.estado){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }

        const usuario:any = await Usuario.findOne({
            where:{
                cedula: persona.cedula
            }
        });

       
        if (!usuario){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }

        if(usuario.roles_sistema != "user_web"){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"
            });
        }

        const cuenta:any =await Cuenta_Acceso.findByPk(usuario.id_usuario)    
        const validPassword =   bycript.compareSync(password, cuenta.contrasena);

        if(!validPassword){
            return res.status(400).json({
                ok: false, 
                msg: "Usuario y/o contraseña no son válidos"            
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
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });

    }
}

export const changePasswordWeb = async(req: Request, res: Response)=>{
    const {cedula, contrasena, nuevacontrasena} = req.body; 
    const persona:any = await Persona.findByPk(cedula); 

    try{
          // si se quiere actualizar la contrasena de un usuario no registrado
    if(!persona){
        return res.status(404).json({
            ok: false, 
            msg: "No es posible realizar está operación"
        });
    }

    const usuario:any = await Usuario.findOne({
        where:{
            cedula: persona.cedula
        }
    }); 

    const acceso:any  = await Cuenta_Acceso.findOne({
        where:{
            id_usuario: usuario.id_usuario
        }
    });

    const validPassword =   bycript.compareSync(contrasena, acceso.contrasena);

    if(!validPassword){
        return res.status(400).json({
            ok: false, 
            msg: "Contraseña inválida"            
        });
    }

    const salt = bycript.genSaltSync(); 
    const newPassword = bycript.hashSync(nuevacontrasena, salt);

    const access:any  = await Cuenta_Acceso.update({
        contrasena: newPassword
    },{
        where:{
            id_usuario: acceso.id_usuario
        }
    }); 

    if(access == 1){
        return res.status(200).json({
            ok: true, 
            msg: "Actualización exitósa"
        })
    }

    res.status(400).json({
        ok: false, 
        msg: "No se ha podido realizar la actualización de contraseña"
    }); 

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        })
    }
  
}


export const changePasswordUser = async(req: Request, res: Response)=>{
    const {contrasena, nuevacontrasena} = req.body; 
    const cedula:any = req.user;
    const persona:any = await Persona.findByPk(cedula); 

    try{
          // si se quiere actualizar la contrasena de un usuario no registrado
    if(!persona){
        return res.status(404).json({
            ok: false, 
            msg: "No es posible realizar está operación"
        });
    }

    const usuario:any = await Usuario.findOne({
        where:{
            cedula: persona.cedula
        }
    }); 

    const acceso:any  = await Cuenta_Acceso.findOne({
        where:{
            id_usuario: usuario.id_usuario
        }
    });

    const validPassword =   bycript.compareSync(contrasena, acceso.contrasena);

    if(!validPassword){
        return res.status(400).json({
            ok: false, 
            msg: "Contraseña inválida"            
        });
    }

    const salt = bycript.genSaltSync(); 
    const newPassword = bycript.hashSync(nuevacontrasena, salt);

    const access:any  = await Cuenta_Acceso.update({
        contrasena: newPassword
    },{
        where:{
            id_usuario: acceso.id_usuario
        }
    }); 

    if(access == 1){
        return res.status(200).json({
            ok: true, 
            msg: "Actualización exitósa"
        })
    }

    res.status(400).json({
        ok: false, 
        msg: "No se ha podido realizar la actualización de contraseña"
    }); 

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        })
    }
  
}