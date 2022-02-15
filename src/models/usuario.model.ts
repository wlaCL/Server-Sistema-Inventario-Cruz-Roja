import {DataTypes} from "sequelize";
import db from "../db/connection.db";

const Usuario = db.define('usuario', {
    id_usuario:{
        type:DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true        
    }, 
    cedula:{
        type: DataTypes.STRING,
        allowNull: false, 
    }, 
    roles_sistema:{
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    dispositivo:{
        type: DataTypes.STRING, 
        allowNull: true
    }
},{
    tableName: 'usuario', 
    timestamps: false, 
      
}); 


export default Usuario;