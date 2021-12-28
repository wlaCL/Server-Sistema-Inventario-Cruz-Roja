import { DataTypes } from "sequelize";
import db from '../db/connection.db'; 

const Categoria = db.define('categoria', {
    id_categoria: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false, 
        validate:{
            notNull:{
                msg:"El id_categoria es obligatorio"
            }
        } 
    }, 
    descripcion:{
        type: DataTypes.STRING(100),
    }, 

    estado: {
        type: DataTypes.STRING(50),
        allowNull: false, 
        defaultValue: true
    }
}, {
    tableName: 'categoria', 
    timestamps: false
}); 

export default Categoria;