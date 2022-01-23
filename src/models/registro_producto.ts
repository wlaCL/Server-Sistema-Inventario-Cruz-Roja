import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Registro_Producto = db.define('registro_producto',{
    fecha_registro:{
        type: DataTypes.DATEONLY, 
        allowNull: false        
    }, 
    cant_consumo:{
        type: DataTypes.INTEGER, 
        allowNull: false, 
    }, 
    id_regisproduc:{
        type: DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    }, 
    id_producambu:{
        type: DataTypes.UUIDV4, 
        allowNull: false
    }
},{
    tableName: 'registro_producto', 
    timestamps: false
});

export default Registro_Producto; 