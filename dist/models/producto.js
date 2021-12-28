"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Producto = connection_db_1.default.define('producto', {
    id_producto: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    id_tipoprod: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        validate: {
            isUUID: {
                args: 36,
                msg: "No es un id válido"
            },
            notNull: {
                msg: "El id del tipo de producto es obligatorio"
            }
        }
    },
    fecha_caducidad: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: "Solo se permite fechas"
            }
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'producto',
    timestamps: false
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map