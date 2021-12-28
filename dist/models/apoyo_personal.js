"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var connection_db_1 = __importDefault(require("../db/connection.db"));
var Apoyo_Personal = connection_db_1.default.define('apoyo_personal', {
    cedula: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
    }
}, {
    tableName: 'apoyo_personal',
    timestamps: false
});
exports.default = Apoyo_Personal;
//# sourceMappingURL=apoyo_personal.js.map