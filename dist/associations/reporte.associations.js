"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = exports.Registro_Producto = exports.Trabaja = exports.Ambulancia = exports.Persona = void 0;
var models_1 = require("../models/models");
Object.defineProperty(exports, "Ambulancia", { enumerable: true, get: function () { return models_1.Ambulancia; } });
Object.defineProperty(exports, "Registro_Producto", { enumerable: true, get: function () { return models_1.Registro_Producto; } });
Object.defineProperty(exports, "Persona", { enumerable: true, get: function () { return models_1.Persona; } });
Object.defineProperty(exports, "Reporte", { enumerable: true, get: function () { return models_1.Reporte; } });
Object.defineProperty(exports, "Trabaja", { enumerable: true, get: function () { return models_1.Trabaja; } });
//una persona puede trabajar en mas de una ambulancia
// una ambulancia puede tener varios tipos de personas con diferentes roles 
models_1.Persona.belongsToMany(models_1.Ambulancia, {
    through: 'trabaja',
    foreignKey: 'cedula',
});
models_1.Ambulancia.belongsToMany(models_1.Persona, {
    through: 'trabaja',
    foreignKey: 'placa'
});
models_1.Trabaja.hasOne(models_1.Reporte, { foreignKey: "id_trabaja" });
models_1.Reporte.belongsTo(models_1.Trabaja, { foreignKey: 'id_trabaja' });
models_1.Reporte.hasMany(models_1.Registro_Producto, { foreignKey: 'id_reporte' });
models_1.Registro_Producto.belongsTo(models_1.Reporte, { foreignKey: 'id_reporte' });
//# sourceMappingURL=reporte.associations.js.map