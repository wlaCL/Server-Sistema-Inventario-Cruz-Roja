import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Unidad_Medida = db.define('unidad_medida', {
    id_tipoprod:{
        type: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false,
        validate:{
            notNull:{
                msg: "El id del producto es obligatorio"
            }            
        }
    }, 
    unidad:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }, 
    caja:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

},{
    timestamps:false,
    tableName: 'unidad_medida'
});

export default Unidad_Medida;