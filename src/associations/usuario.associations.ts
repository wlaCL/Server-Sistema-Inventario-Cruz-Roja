import {Persona, Usuario, Cuenta_Acceso} from "../models/index.model"


// Una persona puede tener varios roles en el sistema
Persona.hasMany(Usuario, {foreignKey:'cedula'}); 
Usuario.belongsTo(Persona, {foreignKey:'cedula'}); 


//Un usuario puede tener una sola cuenta de acceso
Usuario.hasOne(Cuenta_Acceso, {foreignKey:'id_usuario'});
Cuenta_Acceso.belongsTo(Usuario, {foreignKey:'id_usuario'});

export {Usuario, Persona, Cuenta_Acceso};




