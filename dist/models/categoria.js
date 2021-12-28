"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Categoria = connection_db_1.default.define('categoria', {
    id_categoria: {
        type: sequelize_1.DataTypes.UUIDV4,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El id_categoria es obligatorio"
            }
        }
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'categoria',
    timestamps: false
});
exports.default = Categoria;
//# sourceMappingURL=categoria.js.map