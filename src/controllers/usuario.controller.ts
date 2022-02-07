import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import {Usuario, Persona, Cuenta_Acceso} from "../associations/usuario.associations";
import bycripts from 'bcryptjs';


//crear usuario
export const postUsuario = async(req:Request, res: Response) =>{
    const {nombre="", apellido="",cedula="", rol = "", contrasena =""} = req.body;
    let usuario:any; 

    try{ 
        const persona  = await Persona.create({
            cedula, 
            nombre, 
            apellido
        });

        
        usuario = await Usuario.create({
                cedula, 
                roles_sistema: rol
        });     
        
        const salt = bycripts.genSaltSync();
        const password = bycripts.hashSync(contrasena,salt); 

        await Cuenta_Acceso.create({
                id_usuario: usuario.id_usuario, 
                contrasena:password
        });        
        
        return res.status(201).json({
            ok:true,
            msg:"Usuario registrado exitosamente",
            usuario:persona
        });   
      
       
    }catch(error){        
        console.log(error);        
        res.status(500).json({  
                errors: {
                    ok: false, 
                    msg: "Ha ocurrido un error contáctate con el administrador"
                }   
        }); 
           
    }   
}

//eliminar el usuario
export const deleteUsuario = async(req:Request, res:Response)=>{
    try{
        const {cedula} = req.params;
        const persona = await Persona.update({
            estado: false
        },{
            where:{
                cedula
            }
        });

        if(!persona){
            return res.status(404).json({
                error: "No se encontraron registros"
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Usuario eliminado exitósamente',
            persona
        }); 

    }catch(error){
        console.log(error); 
        res.status(500).json({
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }       
}

 /*export const getUsuario  = async(req: Request, res: Response) =>{
    const {nombres= "", cedula = ""} = req.params;
    //const nombres = "Abel Wladimir Cevallos Luna";
   //const nombres = "";
    //const cedula = "1714131678";
    console.log("Datos recibidos: " ,nombres, cedula); 
    const nombres_completos = nombres.split(' ');  
    console.log("nombres completos: ", nombres_completos);   
    const {tipo} = req.query;
    let usuario: any;


    try{
        if(tipo === 'emergencia'){
            usuario = await Usuario.findAndCountAll({
                include: {
                    model: Emergencia_Personal, 
                    attributes:['correo_electronico'] 
                },
                where:{
                    [Op.or]:{
                        [Op.and]:{
                            nombres:nombres_completos[0] + ' ' + nombres_completos[1], 
                            apellidos:nombres_completos[2] + ' ' + nombres_completos[3],
                        },                                          
                        cedula 
                    }                     
                }
            });
        }
        if(tipo === 'apoyo'){
            usuario = await Usuario.findAndCountAll({
                include: {
                    model: Apoyo_Personal, 
                    attributes:{exclude: ['cedula']} 
                },
                where:{
                    [Op.or]:{
                        [Op.and]:{
                            nombres:nombres_completos[0] + ' ' + nombres_completos[1], 
                            apellidos:nombres_completos[2] + ' ' + nombres_completos[3],
                        },                                          
                        cedula 
                    }                     
                }
            });            
        }

        if(usuario.count === 0){
            res.status(400).json({
                msg: "No existe registro con los datos ingresados"
            });
            return
        }

        res.status(200).json({
            msg: "Resultados exitosos", 
            usuarios:usuario.rows, 
            registros: usuario.count
        });
        
    }catch(error){
        console.log(error); 
        res.status(500).json({
            msg: "Ha ocurrido un error contactate con el administrador"
        })
    }
}


//eliminar usuario 
export const deleteUsuario = async(req: Request, res: Response)=>{
    const {cedula} = req.params; 

    let usuario: any;

    try{
        usuario = await Usuario.findByPk(cedula); 

        if(!usuario){
            res.status(400).json({
                msg: "El usuario no se encuentra registrado"
            })
            return 
        }
        
        if(usuario.estado === false){
            res.status(400).json({
                msg: "El usuario ya se encuentra desactivado"
            })
            return        
        }
    
        usuario = await Usuario.update({estado:false},{
            where:{
                cedula
            }
        })
    
        res.status(200).json({
            msg: "Usuario desactivado", 
            usuario
        })

    }catch(error){
        {console.log(error)};   
    }
}*/


//actulizar datos
export const actualizarUsuario = async(req:Request, res:Response)=>{
    const {cedula = ""} = req.params
    const {nombre="", apellido="", rol=""} = req.body; 

    try{
        const personadb:any = await Persona.findOne({
            where: {
                cedula
            }
        }); 

        const persona:any = await Persona.update({
            nombre:(nombre!="")?nombre: personadb.nombre,
            apellido: (apellido!="")?apellido:personadb.apellido,
        },{
            where:{
                cedula
            }
        });

        const usuario:any = await Usuario.findOne({
            where:{
                cedula
            }
        })

      const user:any =  await Usuario.update({
           roles_sistema:(rol=="")? usuario.roles_sistema: rol
       },
        {where:{
            cedula
       }});

       if(user == 0){
        return res.status(400).json({
            ok: false, 
            msg: "No se registraron cambios",
        });
    }

        if(user ==0 && persona == 0){
            return res.status(400).json({
                ok: false, 
                msg: "No se registraron cambios",
            })
        }        

        res.status(200).json({
            ok:true,
            msg:"Actualización exitosa", 
        })

    }catch(error){
        console.log(error);       
        res.status(500).json({  
                errors: {
                    ok: false, 
                    msg: "Ha ocurrido un error contáctate con el administrador"
                }   
        }); 
    } 
}

export const getUsuario =async (req:Request, res:Response) => {
    
    try{
        const {cedula} = req.params; 

        const usuario = await Persona.findByPk(cedula, {
            attributes:["cedula", "nombre", "apellido","estado"],             
            }, 
            
        );
        return res.status(200).json({
            usuario
         });         
    }catch(error){
        console.log(error);       
        res.status(500).json({  
            errors: "Ha ocurrido un error contácte con el administrador"      
        }); 
               
    }   
}

export const getUsuarios = async (req:Request, res:Response) =>{
    const {nombre = "", apellido = ""}:any = req.query;

    console.log("**************************-",nombre, apellido);
  

    try{
        const personas = await Persona.findAll({
            where:{
                [Op.or]:{
                    nombre:{
                        [Op.or]:{
                         [Op.startsWith]: nombre,
                         [Op.substring]: nombre,
                         [Op.endsWith]: nombre
                        }                  
                    }, 
                    apellido:{
                     [Op.or]:{
                         [Op.startsWith]: apellido,
                         [Op.substring]: apellido,
                         [Op.endsWith]: apellido
                          }                
                    }
                },  
                estado: true      
            }

        }); 
     
        if(personas.length == 0){
            return res.status(400).json({
                ok: false, 
                msg: 'No se encontraron registros', 
            });
        }
     
        res.status(200).json({
            ok: true, 
            msg: 'Búsqueda exitosa', 
            personas
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador",
        });
    }
}