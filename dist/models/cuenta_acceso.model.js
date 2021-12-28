"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Cuenta_Acceso = connection_db_1.default.define('cuenta_acceso', {
    id_usuario: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "cuenta_acceso",
    timestamps: false
});
exports.default = Cuenta_Acceso;
//# sourceMappingURL=cuenta_acceso.model.js.map