"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Registro_Producto = connection_db_1.default.define('registro_producto', {
    fecha_registro: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    cant_consumo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_regisproduc: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    id_producambu: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    }
}, {
    tableName: 'registro_producto',
    timestamps: false
});
exports.default = Registro_Producto;
//# sourceMappingURL=registro_producto.js.map