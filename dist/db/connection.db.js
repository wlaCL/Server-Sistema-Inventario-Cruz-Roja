"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
//const db = new Sequelize('mysql://unhw0alr21avotwh:NA3EjYNzbUTh07UMQEvB@bwynno82ixvjmypiwf2u-mysql.services.clever-cloud.com:3306/bwynno82ixvjmypiwf2u');
var db = new sequelize_1.Sequelize("" + process.env.DBDATA);
exports.default = db;
//# sourceMappingURL=connection.db.js.map