"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto_Ambulancia = exports.Unidad_Medida = exports.Producto = exports.TProducto = exports.Categoria = void 0;
var models_1 = require("../models/models");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return models_1.Producto; } });
Object.defineProperty(exports, "TProducto", { enumerable: true, get: function () { return models_1.TProducto; } });
Object.defineProperty(exports, "Categoria", { enumerable: true, get: function () { return models_1.Categoria; } });
Object.defineProperty(exports, "Unidad_Medida", { enumerable: true, get: function () { return models_1.Unidad_Medida; } });
Object.defineProperty(exports, "Producto_Ambulancia", { enumerable: true, get: function () { return models_1.Producto_Ambulancia; } });
// una categoria puede tener varioas tipos de productos
models_1.Categoria.hasMany(models_1.TProducto, { foreignKey: "id_categoria" });
models_1.TProducto.belongsTo(models_1.Categoria, { foreignKey: "id_categoria" });
// Un tipo de producto puede varias fechas de caducidad
models_1.TProducto.hasMany(models_1.Producto, { foreignKey: "id_tipoprod" });
models_1.Producto.belongsTo(models_1.TProducto, { foreignKey: "id_tipoprod" });
//un tipo de producto solo puede tener un solo tipo de presentación
models_1.TProducto.hasOne(models_1.Unidad_Medida, { foreignKey: "id_tipoprod" });
models_1.Unidad_Medida.belongsTo(models_1.Categoria, { foreignKey: "id_tipoprod" });
//Varias ambulancias pueden tener un producto con la misma fecha de caducidad 
// Un producto puede pertenecer a varias ambulancias
models_1.Producto.belongsToMany(models_1.Ambulancia, {
    through: 'producto_ambulancia',
    foreignKey: 'id_producto',
});
models_1.Ambulancia.belongsToMany(models_1.Producto, {
    through: 'producto_ambulancia',
    foreignKey: 'placa'
});
models_1.Producto.hasMany(models_1.Producto_Ambulancia, { foreignKey: 'id_producto' });
models_1.Producto_Ambulancia.belongsTo(models_1.Producto, { foreignKey: 'id_producto' });
//# sourceMappingURL=producto.associations.js.map