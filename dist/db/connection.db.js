"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
//import dotenv from "dotenv";
//import path from 'path';
//dotenv.config({path: '../.env'});
var db = new sequelize_1.Sequelize('mysql://unhw0alr21avotwh:NA3EjYNzbUTh07UMQEvB@bwynno82ixvjmypiwf2u-mysql.services.clever-cloud.com:3306/bwynno82ixvjmypiwf2u');
//const db = new Sequelize( `${process.env.DBDATA}`);
exports.default = db;
//# sourceMappingURL=connection.db.js.map