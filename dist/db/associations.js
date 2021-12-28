"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var usuario_models_1 = __importDefault(require("../models/usuario.models"));
var apoyo_personal_1 = __importDefault(require("../models/apoyo_personal"));
var emergencia_personal_1 = __importDefault(require("../models/emergencia_personal"));
//Relacion uno a uno  de las tablas usuario y aporoyo personal
usuario_models_1.default.hasOne(apoyo_personal_1.default, { foreignKey: 'cedula' });
apoyo_personal_1.default.belongsTo(usuario_models_1.default, { foreignKey: 'cedula' });
//Relación  uno  a uno de las tablas usuario y emeregencia_personal
usuario_models_1.default.hasOne(emergencia_personal_1.default, { foreignKey: 'cedula' });
emergencia_personal_1.default.belongsTo(usuario_models_1.default, { foreignKey: 'cedula' });
//# sourceMappingURL=associations.js.map