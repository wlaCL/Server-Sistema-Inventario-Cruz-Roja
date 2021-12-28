import { DataTypes } from "sequelize";
import db from "../db/connection.db";


const Persona = db.define('persona',{
    cedula:{
        type: DataTypes.STRING,
        primaryKey: true,
    }, 
    nombre:{
        type: DataTypes.STRING, 
        allowNull: false,
        validate:{
            is:{
                args:[/^[A-Za-z\s]+$/], 
                msg:"El nombre solo debe contener letras"
            }
        } 
    }, 
    apellido:{
        type:DataTypes.STRING, 
        allowNull: false,
        validate:{
            is:{
                args:[/^[A-Za-z\s]+$/], 
                msg:"El apellido solo debe contener letras"
            }
        } 
    },
    estado:{
        type: DataTypes.BOOLEAN, 
        defaultValue:true,
    }
},{
    tableName: 'persona', 
    timestamps: false
});

export default Persona;