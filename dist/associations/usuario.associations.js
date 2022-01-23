"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuenta_Acceso = exports.Persona = exports.Usuario = void 0;
var models_1 = require("../models/models");
Object.defineProperty(exports, "Persona", { enumerable: true, get: function () { return models_1.Persona; } });
Object.defineProperty(exports, "Usuario", { enumerable: true, get: function () { return models_1.Usuario; } });
Object.defineProperty(exports, "Cuenta_Acceso", { enumerable: true, get: function () { return models_1.Cuenta_Acceso; } });
// Una persona puede tener varios roles en el sistema
models_1.Persona.hasMany(models_1.Usuario, { foreignKey: 'cedula' });
models_1.Usuario.belongsTo(models_1.Persona, { foreignKey: 'cedula' });
//Un usuario puede tener una sola cuenta de acceso
models_1.Usuario.hasOne(models_1.Cuenta_Acceso, { foreignKey: 'id_usuario' });
models_1.Cuenta_Acceso.belongsTo(models_1.Usuario, { foreignKey: 'id_usuario' });
//# sourceMappingURL=usuario.associations.js.map