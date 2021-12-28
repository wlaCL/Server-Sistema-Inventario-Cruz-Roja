"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Usuario = connection_db_1.default.define('usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roles_sistema: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    timestamps: false,
});
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map