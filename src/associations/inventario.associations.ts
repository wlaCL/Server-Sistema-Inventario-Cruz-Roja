import {Registro_Producto,  Producto_Ambulancia} from '../models/models';

Producto_Ambulancia.hasMany(Registro_Producto, {foreignKey: 'id_producambu'}); 
Registro_Producto.belongsTo(Producto_Ambulancia, {foreignKey: 'id_producambu'});



export {Registro_Producto}