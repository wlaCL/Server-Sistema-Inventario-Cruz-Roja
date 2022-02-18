import {Sequelize} from 'sequelize'
import dotenv from "dotenv";
import path from 'path';

dotenv.config({path: '../.env'});
//const db = new Sequelize('mysql://unhw0alr21avotwh:NA3EjYNzbUTh07UMQEvB@bwynno82ixvjmypiwf2u-mysql.services.clever-cloud.com:3306/bwynno82ixvjmypiwf2u');
const db = new Sequelize( `${process.env.DBDATA}`);


export default db;



