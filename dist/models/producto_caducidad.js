"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Producto_Caducidad = connection_db_1.default.define('producto_caducidad', {
    id_producad: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    fecha_cad: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
    cant_igual: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_producto: {
        //enlazar con la tabla producto 
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'produc_caducidad',
    timestamps: false
});
exports.default = Producto_Caducidad;
//# sourceMappingURL=producto_caducidad.js.map