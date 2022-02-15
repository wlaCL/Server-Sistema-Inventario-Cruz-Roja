"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registro_Producto = void 0;
var models_1 = require("../models/models");
Object.defineProperty(exports, "Registro_Producto", { enumerable: true, get: function () { return models_1.Registro_Producto; } });
models_1.Producto_Ambulancia.hasMany(models_1.Registro_Producto, { foreignKey: 'id_producambu' });
models_1.Registro_Producto.belongsTo(models_1.Producto_Ambulancia, { foreignKey: 'id_producambu' });
//# sourceMappingURL=inventario.associations.js.map