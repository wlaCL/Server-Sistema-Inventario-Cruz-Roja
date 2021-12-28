"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Reporte = connection_db_1.default.define('reporte', {
    id_reporte: {
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        type: sequelize_1.DataTypes.UUID
    },
    num_vehiculo: {
        // TODO: con tabla vehiculo
        type: sequelize_1.DataTypes.STRING,
    },
    emer_cedula: {
        //TODO conectar con tabla emergencia
        type: sequelize_1.DataTypes.STRING
    },
    apoyo_cedula: {
        //TODO conectar con la tabla apoyo emergencia
        // falta otro campo para la condocutor y/o asistente
        type: sequelize_1.DataTypes.STRING
    },
    novedades: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    hora_entrada: {
        //hora desde el movil
        type: sequelize_1.DataTypes.TIME
    },
    hora_salida: {
        //hora desde el movil
        type: sequelize_1.DataTypes.TIME
    }
}, {
    tableName: 'reporte'
});
exports.default = Reporte;
//# sourceMappingURL=reporte.js.map