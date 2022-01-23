"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Producto_Ambulancia = connection_db_1.default.define('producto_ambulancia', {
    id_producambu: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    id_producto: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El id del producto es obligatorio"
            }
        }
    },
    placa: {
        type: sequelize_1.DataTypes.STRING(7),
        allowNull: false,
        validate: {
            notNull: {
                msg: "La placa es obligatoria"
            },
        }
    },
    cant_ambulancia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad es obligatoria"
            }
        }
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    timestamps: false,
    tableName: "producto_ambulancia"
});
exports.default = Producto_Ambulancia;
//# sourceMappingURL=producto_ambulancia.js.map