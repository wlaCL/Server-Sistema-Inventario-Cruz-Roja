import { Producto, TProducto, Categoria, Unidad_Medida} from "../models/index.model";

// una categoria puede tener varioas tipos de productos
Categoria.hasMany(TProducto, {foreignKey:"id_categoria"});
TProducto.belongsTo(Categoria, {foreignKey:"id_categoria"})

// Un tipo de producto puede varias fechas de caducidad
TProducto.hasMany(Producto, {foreignKey:"id_tipoprod"});
Producto.belongsTo(Categoria, {foreignKey:"id_tipoprod"});


//un tipo de producto solo puede tener un solo tipo de presentación
TProducto.hasOne(Unidad_Medida, {foreignKey:"id_tipoprod"});
Unidad_Medida.belongsTo(Categoria, {foreignKey:"id_tipoprod"});

export {Categoria,  TProducto, Producto, Unidad_Medida}