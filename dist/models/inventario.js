"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Inventario = connection_db_1.default.define('inventario', {
    id_inventario: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    id_producto: {
        // se tiene que enlazara con la tabla producto 
        type: sequelize_1.DataTypes.UUID
    },
    cant_consumo: {
        type: sequelize_1.DataTypes.INTEGER,
    }
    //TODO CANTIDAD DE CARGA falta por agregar
}, {
    tableName: 'inventario'
});
exports.default = Inventario;
//# sourceMappingURL=inventario.js.map