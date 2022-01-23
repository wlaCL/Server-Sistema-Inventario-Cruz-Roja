import { Producto, TProducto, Categoria, Unidad_Medida, Ambulancia, Registro_Producto,  Producto_Ambulancia} from "../models/models";

// una categoria puede tener varioas tipos de productos
Categoria.hasMany(TProducto, {foreignKey:"id_categoria"});
TProducto.belongsTo(Categoria, {foreignKey:"id_categoria"})

// Un tipo de producto puede varias fechas de caducidad
TProducto.hasMany(Producto, {foreignKey:"id_tipoprod"});
Producto.belongsTo(TProducto, {foreignKey:"id_tipoprod"});


//un tipo de producto solo puede tener un solo tipo de presentación
TProducto.hasOne(Unidad_Medida, {foreignKey:"id_tipoprod"});
Unidad_Medida.belongsTo(Categoria, {foreignKey:"id_tipoprod"});

//Varias ambulancias pueden tener un producto con la misma fecha de caducidad 
// Un producto puede pertenecer a varias ambulancias

Producto.belongsToMany(Ambulancia,{
    through: 'producto_ambulancia', 
    foreignKey: 'id_producto',
});

Ambulancia.belongsToMany(Producto, {
    through: 'producto_ambulancia', 
    foreignKey: 'placa'
});


Producto.hasMany(Producto_Ambulancia, {foreignKey:'id_producto'}); 
Producto_Ambulancia.belongsTo(Producto,{foreignKey: 'id_producto'} )



//Un producto de ambulancia puede tener varios registros pero un registro de solo puede pertenecer a un producto de ambulancia




export {Categoria,  TProducto, Producto, Unidad_Medida, Producto_Ambulancia}