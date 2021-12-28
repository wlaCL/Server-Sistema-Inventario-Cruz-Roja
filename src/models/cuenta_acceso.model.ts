import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Cuenta_Acceso = db.define('cuenta_acceso',{
    id_usuario:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }, 
    contrasena:{
        type: DataTypes.STRING, 
        allowNull:false, 
    }
},{
    tableName:"cuenta_acceso", 
    timestamps: false
});

export default Cuenta_Acceso;