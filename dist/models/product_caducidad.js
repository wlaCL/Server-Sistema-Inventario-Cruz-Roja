"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("sequelize/types");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Producto_Caducidad = connection_db_1.default.define('producto_caducidad', {
    id_productcad: {
        type: types_1.DataTypes.UUID,
        primaryKey: true
    },
    fecha_cad: {
        type: types_1.DataTypes.DATEONLY,
    },
    cant_igual: {
        type: types_1.DataTypes.INTEGER
    },
    id_producto: {
        //enlazar con la tabla producto 
        type: types_1.DataTypes.STRING
    },
}, {
    tableName: 'product_caducidad'
});
exports.default = Producto_Caducidad;
//# sourceMappingURL=product_caducidad.js.map