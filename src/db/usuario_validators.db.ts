import {Usuario, Persona} from '../associations/usuario.associations';

export const noExistePersona = async(cedula = "" )=>{ 
    const persona = await Persona.findByPk(cedula);
    if(persona){
        throw new Error(`La cédula ya se encuentra registrada ${cedula}`)        
    }
}

export const existeUsuario = async (cedula = "") => {
  
    const usuario = await Persona.findByPk(cedula); 
    if(!usuario){
        throw new Error(`Cedula no registrada`);
    }
}

export const usuarioActivo = async(cedula = "")=>{
    const persona:any = await Persona.findByPk(cedula); 
    if(persona.estado == false){
        throw new Error("El usuario se encuentra inactivado")        
    }
}