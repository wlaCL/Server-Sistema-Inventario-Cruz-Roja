"use strict";
/*import Usuario from "../models/usuario";

import Categoria from '../models/categoria';
import Producto from '../models/producto';
import Ambulancia from '../models/ambulancia';




//Relacion uno a uno  de las tablas usuario y aporoyo personal
Usuario.hasOne(Apoyo_Personal, {foreignKey: 'cedula'});
Apoyo_Personal.belongsTo(Usuario, {foreignKey:'cedula'});

//Relación  uno  a uno de las tablas usuario y emeregencia_personal
Usuario.hasOne(Emergencia_Personal, {foreignKey: 'cedula'});
Emergencia_Personal.belongsTo(Usuario, {foreignKey: 'cedula'});


//un un usuario de emergencia puede crear varias categorias y una categoria pertenece a un solo user
Emergencia_Personal.hasMany(Categoria, { as: 'id_categoria',   foreignKey: 'cedula'});
Categoria.belongsTo(Emergencia_Personal, {as : 'id_personal_emergencia', foreignKey:'cedula'});

// Relación de uno a muchos de categoria a producto
Categoria.hasMany(Producto, {foreignKey:'id_categoria'});
Producto.belongsTo(Categoria, {foreignKey: 'id_categoria'});


// Relación de producto a inventario
// un producto puede estar en varios inventarios (cada inventario es un ingreso en el contexto)

Producto.hasMany(Inventario,{foreignKey: 'id_inventario'} );
Inventario.belongsTo(Producto,{foreignKey: 'id_inventario'});

//Relación producto a productos_caducidad;
Producto.hasMany(Producto_Caducidad, {foreignKey: 'id_producto'});
Producto_Caducidad.belongsTo(Producto, {foreignKey: 'id_producto'});

// **Relación con el reporte**
// reporte con el vehiculo
Reporte.hasOne(Ambulancia, {foreignKey: 'num_vehiculo'});
Ambulancia.belongsTo(Reporte, {foreignKey: 'num_vehiculo'});

//reporte con inventario
Reporte.hasMany(Inventario, {foreignKey: 'id_inventario'});
Inventario.belongsTo(Reporte, {foreignKey: 'id_inventario'});

// reporte con usuarios de emergencia




//reporte con usuarios de apoyo

export {Usuario, Apoyo_Personal, Emergencia_Personal, Categoria, Producto, Inventario, Producto_Caducidad, Reporte, Ambulancia};

*/
//# sourceMappingURL=associations.js.map