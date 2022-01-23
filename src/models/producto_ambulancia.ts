import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Producto_Ambulancia = db.define('producto_ambulancia',{
    id_producambu : {
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },
    id_producto:{
        type: DataTypes.UUIDV4, 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El id del producto es obligatorio"
            }
        }
    }, 
    placa:{
        type: DataTypes.STRING(7), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: "La placa es obligatoria"
            }, 
        }
    }, 
    cant_ambulancia: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        validate: {
            notNull: {
                msg: "La cantidad es obligatoria"
            }
        }
    }, 
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }, 
    stock:{
        type: DataTypes.INTEGER,
    }
},{
    timestamps: false,
    tableName: "producto_ambulancia"
});

export default Producto_Ambulancia;