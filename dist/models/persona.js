"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Persona = connection_db_1.default.define('persona', {
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: [/^[A-Za-z\s]+$/],
                msg: "El nombre solo debe contener letras"
            }
        }
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: [/^[A-Za-z\s]+$/],
                msg: "El apellido solo debe contener letras"
            }
        }
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: 'persona',
    timestamps: false
});
exports.default = Persona;
//# sourceMappingURL=persona.js.map