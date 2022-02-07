import { DataTypes } from "sequelize";
import db from '../db/connection.db';

const Ambulancia = db.define('ambulancia',{
    num_vehiculo:{
        type: DataTypes.STRING,
    },  
    descripcion:{
        type: DataTypes.TEXT
    }, 
    placa:{
        type:DataTypes.STRING, 
        allowNull: false, 
        primaryKey:true
    },
    estado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: true        
    }
},{
    tableName: 'ambulancia', 
    timestamps: false
});

export default Ambulancia; 