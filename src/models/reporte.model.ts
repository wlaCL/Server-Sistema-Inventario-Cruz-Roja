import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Reporte = db.define('reporte',{
    id_reporte:{
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    }, 
    placa:{
        type: DataTypes.STRING(7), 
        allowNull: false, 
        validate:{
            notNull: {
                msg: "La placa del vehículo es obligatoria"
            }
        }
    }, 
    id_trabaja:{
        type: DataTypes.UUIDV4, 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El id del paramédico es obligatorio"
            }
        }
    }, 
    fecha:{
        type: DataTypes.DATEONLY, 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "La fecha de registro es obligatoria"
            }
        }
    }, 
    novedades: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    base:{
        type: DataTypes.STRING, 
        allowNull: true, 
    }, 
    conductor:{
        type: DataTypes.STRING,
        allowNull: true
    }, 
    asistente:{
        type: DataTypes.STRING, 
        allowNull: true
    }
},{
    timestamps: false, 
    tableName: 'reporte'
}); 


export default Reporte; 