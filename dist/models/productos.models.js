"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Producto = connection_db_1.default.define('producto', {
    id_producto: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID //genera un id automático sin en mysql de char(36) digitos
    },
    id_categoria: {
        // se tiene que enlazar con la tabla categoria 
        type: sequelize_1.DataTypes.UUID,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    cant_minima: {
        type: sequelize_1.DataTypes.STRING,
    },
    cantidad_disponible: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'producto'
});
exports.default = Producto;
//# sourceMappingURL=productos.models.js.map