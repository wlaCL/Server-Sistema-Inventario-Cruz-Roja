"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidad_Medida = exports.Producto = exports.TProducto = exports.Categoria = void 0;
var index_model_1 = require("../models/index.model");
Object.defineProperty(exports, "Producto", { enumerable: true, get: function () { return index_model_1.Producto; } });
Object.defineProperty(exports, "TProducto", { enumerable: true, get: function () { return index_model_1.TProducto; } });
Object.defineProperty(exports, "Categoria", { enumerable: true, get: function () { return index_model_1.Categoria; } });
Object.defineProperty(exports, "Unidad_Medida", { enumerable: true, get: function () { return index_model_1.Unidad_Medida; } });
// una categoria puede tener varioas tipos de productos
index_model_1.Categoria.hasMany(index_model_1.TProducto, { foreignKey: "id_categoria" });
index_model_1.TProducto.belongsTo(index_model_1.Categoria, { foreignKey: "id_categoria" });
// Un tipo de producto puede varias fechas de caducidad
index_model_1.TProducto.hasMany(index_model_1.Producto, { foreignKey: "id_tipoprod" });
index_model_1.Producto.belongsTo(index_model_1.Categoria, { foreignKey: "id_tipoprod" });
//un tipo de producto solo puede tener un solo tipo de presentación
index_model_1.TProducto.hasOne(index_model_1.Unidad_Medida, { foreignKey: "id_tipoprod" });
index_model_1.Unidad_Medida.belongsTo(index_model_1.Categoria, { foreignKey: "id_tipoprod" });
//# sourceMappingURL=producto.js.map