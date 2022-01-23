"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Trabaja = connection_db_1.default.define('trabaja', {
    id_trabaja: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    placa: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: false,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cédula es obligatoria"
            }
        }
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'trabaja'
});
exports.default = Trabaja;
//# sourceMappingURL=trabaja.model.js.map