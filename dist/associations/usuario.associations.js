"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuenta_Acceso = exports.Persona = exports.Usuario = void 0;
var index_model_1 = require("../models/index.model");
Object.defineProperty(exports, "Persona", { enumerable: true, get: function () { return index_model_1.Persona; } });
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return index_model_1.Usuario; } });
Object.defineProperty(exports, "Cuenta_Acceso", { enumerable: true, get: function () { return index_model_1.Cuenta_Acceso; } });
// Una persona puede tener varios roles en el sistema
index_model_1.Persona.hasMany(index_model_1.Usuario, { foreignKey: 'cedula' });
index_model_1.Usuario.belongsTo(index_model_1.Persona, { foreignKey: 'cedula' });
//Un usuario puede tener una sola cuenta de acceso
index_model_1.Usuario.hasOne(index_model_1.Cuenta_Acceso, { foreignKey: 'id_usuario' });
index_model_1.Cuenta_Acceso.belongsTo(index_model_1.Usuario, { foreignKey: 'id_usuario' });
//# sourceMappingURL=usuario.associations.js.map