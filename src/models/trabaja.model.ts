import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Trabaja = db.define('trabaja',{
    id_trabaja:{
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    placa:{
        type: DataTypes.STRING(7), 
        allowNull: false, 
    }, 
    cedula:{
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            notNull:{
                msg : "La cédula es obligatoria"
            }
        }
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY, 
        allowNull: true
    }, 
    fecha_fin: {
        type: DataTypes.DATEONLY, 
        allowNull: true
    },
    rol:{
        type: DataTypes.STRING, 
        allowNull: false
    }
},{
    timestamps: false, 
    tableName: 'trabaja'
});

export default Trabaja; 
