import { Request, Response } from 'express';
import { TProducto} from '../associations/producto.associations';
import { Op } from 'sequelize';

export const getProductos = async (req: Request, res: Response)=>{
    const {termino}  = req.params;

    try{
        const {rows, count}:any = await TProducto.findAndCountAll({
            where: {
                nombre:{
                    [Op.or]:{
                        [Op.startsWith]: termino,                  // LIKE 'hat%'
                        [Op.endsWith]: termino,                    // LIKE '%hat'
                        [Op.substring]: termino
                    }
                },
                estado: true
            }
        });

        console.log(rows, count);

        if(rows == 0){
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron registros"
            })
        }

        res.status(200).json({
            ok: true,
            msg: "Búsqueda éxitosa",
            productos: rows,
            registros: count        
        })
    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        })
    }
}

