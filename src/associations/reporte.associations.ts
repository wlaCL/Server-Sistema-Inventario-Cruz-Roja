import {Ambulancia, Registro_Producto, Persona, Reporte, Trabaja} from '../models/models';

//una persona puede trabajar en mas de una ambulancia
// una ambulancia puede tener varios tipos de personas con diferentes roles 

Persona.belongsToMany(Ambulancia,{
    through: 'trabaja', 
    foreignKey: 'cedula',
});

Ambulancia.belongsToMany(Persona, {
    through: 'trabaja', 
    foreignKey: 'placa'
});

Trabaja.hasOne(Reporte, {foreignKey: "id_trabaja"}); 
Reporte.belongsTo(Trabaja, {foreignKey: 'id_trabaja'});

Reporte.hasMany(Registro_Producto, {foreignKey: 'id_reporte'});
Registro_Producto.belongsTo(Reporte, {foreignKey: 'id_reporte'});
export {Persona, Ambulancia, Trabaja, Registro_Producto, Reporte}