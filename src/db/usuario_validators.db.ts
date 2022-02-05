import {Usuario, Persona} from '../associations/usuario.associations';

export const noExistePersona = async(cedula = "" )=>{ 
    const persona = await Persona.findByPk(cedula);
    if(persona){
        throw new Error(`La cédula ${cedula} ya se encuentra registrada `)        
    }
}

export const existeUsuario = async (cedula = "") => {
  
    const usuario = await Persona.findOne({
        where:{
            cedula, 
            estado:true
        }
    }); 
    if(!usuario){
        throw new Error(`Cedula no registrada`);
    }
}

export const usuarioActivo = async(cedula = "")=>{
    const persona:any = await Persona.findOne({
        where:{
            cedula, 
            estado: false
        }
    }); 
    if(persona){
        throw new Error("El usuario se encuentra inactivo")        
    }
}