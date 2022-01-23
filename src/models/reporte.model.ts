import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Reporte = db.define('reporte',{
    id_reporte:{
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    }, 
    id_regisproduc:{
        type: DataTypes.UUIDV4,
        allowNull: false, 
        validate:{
            msg:"El id del registro del producto es obligatorio"
        }
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
            msg: "El id del encabezado es obligatorio"
        }
    }, 
    fecha:{
        type: DataTypes.DATEONLY, 
        allowNull: false, 
        validate:{
            msg: "La fecha de registro es obligatoria"
        }
    }, 
    novedades: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    base:{
        type: DataTypes.STRING, 
        allowNull: true, 
        validate:{
            msg :"La base es obligatoria"
        }
    }
},{
    timestamps: false, 
    tableName: 'reporte'
}); 


export default Reporte; 