import {DataTypes } from "sequelize";
import db from "../db/connection.db";


const Producto = db.define('producto', {
    id_producto:{
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,         
    }, 
    id_tipoprod:{
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            isUUID:{
                args:4, 
                msg:"No es un id válido"
            }, 
            notNull:{
                msg:"El id del tipo de producto es obligatorio"
            }
        }
    },    
    fecha_caducidad: {
        type: DataTypes.DATEONLY, 
        allowNull: true,
        validate:{
            isDate:{
                args:true,
                msg:"Solo se permite fechas"
            }
        }
    }, 
    cantidad:{
     type: DataTypes.INTEGER, 
    }, 
    disponibilidad:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false, 
        validate:{
            notNull:{
                msg: "Se necesita el estado de disponibilidad"
            }
        }
    }
    
},{
    tableName: 'producto', 
    timestamps: false
}); 

export default Producto;