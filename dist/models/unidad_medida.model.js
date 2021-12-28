"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Unidad_Medida = connection_db_1.default.define('unidad_medida', {
    id_tipoprod: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El id del producto es obligatorio"
            }
        }
    },
    unidad: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    caja: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'unidad_medida'
});
exports.default = Unidad_Medida;
//# sourceMappingURL=unidad_medida.model.js.map