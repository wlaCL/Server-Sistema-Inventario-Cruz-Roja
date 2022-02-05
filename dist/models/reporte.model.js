"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Reporte = connection_db_1.default.define('reporte', {
    id_reporte: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    placa: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: false,
        validate: {
            notNull: {
                msg: "La placa del vehículo es obligatoria"
            }
        }
    },
    id_trabaja: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El id del paramédico es obligatorio"
            }
        }
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La fecha de registro es obligatoria"
            }
        }
    },
    novedades: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    base: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    conductor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    asistente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'reporte'
});
exports.default = Reporte;
//# sourceMappingURL=reporte.model.js.map