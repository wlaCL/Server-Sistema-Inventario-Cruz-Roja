"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Emergencia_Personal = connection_db_1.default.define('emergencia_personal', {
    cedula: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    // solicitar cambio a 60 var
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'emergencia_personal',
    timestamps: false
});
exports.default = Emergencia_Personal;
//# sourceMappingURL=emergencia_personal.js.map