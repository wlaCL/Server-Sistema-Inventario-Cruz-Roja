import { DataTypes } from "sequelize";
import db from '../db/connection.db';

const Ambulancia = db.define('ambulancia',{
    num_vehiculo:{
        type: DataTypes.STRING(10),
        validate:{
            isNumeric:{
                msg: "El número de vehículo solo puede ser un número"
            }, 
            len:{
                args:[1,10], 
                msg:"El número de vehículo solo puede contener entre un dígito y diez dígitos"
            }
        } 
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