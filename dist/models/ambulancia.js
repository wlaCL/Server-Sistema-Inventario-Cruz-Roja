"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Ambulancia = connection_db_1.default.define('ambulancia', {
    num_vehiculo: {
        type: sequelize_1.DataTypes.STRING(10),
        validate: {
            isNumeric: {
                msg: "El número de vehículo solo puede ser un número"
            },
            len: {
                args: [1, 10],
                msg: "El número de vehículo solo puede contener entre un dígito y diez dígitos"
            }
        }
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT
    },
    placa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'ambulancia',
    timestamps: false
});
exports.default = Ambulancia;
//# sourceMappingURL=ambulancia.js.map