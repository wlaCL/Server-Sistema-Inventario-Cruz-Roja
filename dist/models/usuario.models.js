"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Usuario = connection_db_1.default.define('usuario', {
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING
    },
    rol: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'usuario',
    timestamps: false,
});
exports.default = Usuario;
//# sourceMappingURL=usuario.models.js.map