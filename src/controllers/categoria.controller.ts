import { Request, Response, urlencoded } from 'express'; 
import { Op, where } from 'sequelize';

import GenericError from '../models/errors/error';
import {Categoria, TProducto, Producto, Producto_Ambulancia} from '../associations/producto.associations';


export const getCategorias = async(req:Request, res: Response) => {
    const {inicio = 0, fin = 3} = req.query; 
    try{        
        const categorias  = await Categoria.findAndCountAll({
            attributes:{exclude:['estado']},
            where:{
                estado:true
            }, 
            limit: Number(fin), 
            offset: Number(inicio)
        });

        if(!categorias){
            return res.status(404).json({
                ok: false, 
                msg: "No se han encontrado registros"             
            });
        }

        return res.status(200).json({
            msg: 'Resultados exitosos',
            categorias:categorias.rows,
            registros: categorias.count,             
        });

    } catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador",
        });
    }     
}
//buscar una categoria 
export const getCategoria = async(req: Request, res:Response)=>{
    const {nombre}  = req.params;  
    const {inicio = 0, fin = 3} = req.query; 
    try{
        
        const {rows, count} = await Categoria.findAndCountAll({         
            where: {           
                nombre:{
                    [Op.or]: {
                        [Op.startsWith]:nombre, 
                        [Op.endsWith]: nombre, 
                        [Op.substring]: nombre
                        }                        
                    },
                estado: true,                         
            },  
            limit: Number(fin), 
            offset: Number(inicio)                                   
        });
        
        if(rows.length === 0){
            return res.status(404).json({
                ok: false, 
                msg: "No existen registros"             
            });
        }
    
        res.status(200).json({
            msg: 'Búsqueda éxitosa',
            categorias: rows, 
            registros: count
        }); 

    }catch(error){
        console.log(error); 
        res.status(500).json({
            msg: "Ha ocurrido un error contáctate con el administrador"
        })
    }   
}

export const postCategoria = async(req: Request, res: Response) => {   
    const {nombre, descripcion} = req.body;    

   try{               
        const categoria = await Categoria.create({
            nombre, 
            descripcion
        });
        res.status(201).json({
            ok: true,
            msg: "Categoría de creada exitósamente",
            categoria
        });
   }catch(error){
    console.log(error); 
    res.status(500).json({
        ok: false, 
        msg: "Ha ocurrido un error contáctate con el administrador",
    });
     
    }
}

//se necesita recibir los parametros
export const putCategoria = async(req: Request, res: Response) =>{
    const {id= ""}  = req.params;
    const {nombre="", descripcion = ""} = req.body;   
    try{
        const categoria:any = await Categoria.findOne({
            where: {
                id_categoria: id, 
                estado:true
            }
        }); 

        await Categoria.update({
            nombre: (nombre!="")?nombre: categoria.nombre,
            descripcion: (descripcion!="")?descripcion: categoria.descripcion
        }, {
            where:{id_categoria: id}
        });

            res.status(200).json({
            ok: true,
            msg: "Actualizacion exitosa", 
            categoria
        });
    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador",
        });  
    }
}

//falta un estado para la eliminacipon 
export const deleteCategoria = async (req: Request, res: Response) =>{
    const {id=""}  = req.params;
    
    try{
        const categoria = await Categoria.update({
            estado:false,
            
        }, {
            where:{id_categoria:id}
        });
        
    
        return res.status(200).json({
            ok: true,
            msg: "Eliminación exitosa",
            categoria
         });
        
        
    }catch(error){
        console.log(error); 
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador",
        });
    }    
}

