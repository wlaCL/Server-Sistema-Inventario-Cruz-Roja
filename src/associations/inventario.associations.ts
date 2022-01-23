import {Registro_Producto,  Producto_Ambulancia} from '../models/models';

Producto_Ambulancia.hasOne(Registro_Producto, {foreignKey: 'id_producambu'}); 
Registro_Producto.hasMany(Producto_Ambulancia, {foreignKey: 'id_producambu'});



export {Registro_Producto}