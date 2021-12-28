import { Request, Response } from 'express'; 
import {Op} from 'sequelize';

import GenericError from '../models/errors/error';
import {Categoria} from '../associations/producto.associations';

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
            const obj = new GenericError('categorias', "No existen registros")
            return res.status(404).json({
                errors:obj.ErrorObjt              
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
            msg: "Ha ocurrido un error contactate con el administrador"
        })
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
            const obj = new GenericError(nombre, "No existen registros")
            return res.status(404).json({
                errors:obj.ErrorObjt              
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
        await Categoria.create({
            nombre, 
            descripcion
        });
        res.status(201).json({
            msg: "Categoría de creada exitósamente",
        });
   }catch(error){
    console.log(error);
    const {name, errors}:any = error        
        if(name === "SequelizeValidationError"){
            const obj = new GenericError(errors[0].value, errors[0].message )
            return res.status(422).json({
            errors:obj.ErrorObjt
            });
        } else{
            res.status(500).json({  
                errors: "Ha ocurrido un error contácte con el administrador"      
            }); 
        }  
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
            msg: "Actualizacion exitosa"
        });
    }catch(error){
        console.log(error);
        const {name, errors}:any = error        
        if(name === "SequelizeValidationError"){
            const obj = new GenericError(errors[0].value, errors[0].message )
            return res.status(422).json({
            errors:obj.ErrorObjt
            });
        } else{
            res.status(500).json({  
                errors: "Ha ocurrido un error contácte con el administrador"      
            }); 
        }  
    }
}

//falta un estado para la eliminacipon 
export const deleteCategoria = async (req: Request, res: Response) =>{
    const {id=""}  = req.params;
    
    try{
        await Categoria.update({
            estado:false,
        }, {
            where:{id_categoria:id}
        });
        res.status(200).json({
            msg: "Eliminación exitosa"
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            errors: "Ha ocurrido un errror por favor contactate con el administrador"
        });
    }    
}

