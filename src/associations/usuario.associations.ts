import {Persona, Usuario, Cuenta_Acceso, Trabaja} from "../models/models"


// Una persona puede tener varios roles en el sistema
Persona.hasMany(Usuario, {foreignKey:'cedula'}); 
Usuario.belongsTo(Persona, {foreignKey:'cedula'}); 

Persona.hasMany(Trabaja, {foreignKey:'cedula'}); 
Trabaja.belongsTo(Persona, {foreignKey:'cedula'}); 


//Un usuario puede tener una sola cuenta de acceso
Usuario.hasOne(Cuenta_Acceso, {foreignKey:'id_usuario'});
Cuenta_Acceso.belongsTo(Usuario, {foreignKey:'id_usuario'});

export {Usuario, Persona, Cuenta_Acceso};




