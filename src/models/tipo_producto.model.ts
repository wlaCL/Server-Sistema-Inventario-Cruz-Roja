import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const TProducto = db.define('tipo_producto',{
    id_tipoprod:{
        type:DataTypes.UUIDV4, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    }, 
    id_categoria:{
        type: DataTypes.UUIDV4,
        allowNull: false, 
        validate:{
            notNull:{
                msg:"El id_categoria es obligatorio"
            }, 
            isUUID:{
                args:4,
                msg:"no es un id con formato válido"
            }
        } 
    }, 
    nombre:{
        type:DataTypes.STRING(50), 
        allowNull:false,
    }, 
    descripcion:{
        type:DataTypes.STRING(100),
        allowNull:true
    }, 
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
    }, 
    can_minima:{
        type:DataTypes.INTEGER, 
        allowNull:false, 
        validate:{
            isInt:{
                msg:"La cantidad mínima debe ser un número"
            }
        }
    }, 
    tipo:{
        type:DataTypes.STRING, 
        validate:{
            isIn:{
                args: [['Insumo Medico', 'Equipo']], 
                msg:"no es un tipo válido"
            }
        }
    }   
}, {
    tableName:"tipo_producto", 
    timestamps: false
});

export default TProducto;