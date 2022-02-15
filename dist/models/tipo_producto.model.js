"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var TProducto = connection_db_1.default.define('tipo_producto', {
    id_tipoprod: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    id_categoria: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El id_categoria es obligatorio"
            },
            isUUID: {
                args: 4,
                msg: "no es un id con formato válido"
            }
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    can_minima: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "La cantidad mínima debe ser un número"
            }
        }
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: {
                args: [['Insumo Medico', 'Equipo']],
                msg: "no es un tipo válido"
            }
        }
    }
}, {
    tableName: "tipo_producto",
    timestamps: false
});
exports.default = TProducto;
//# sourceMappingURL=tipo_producto.model.js.map