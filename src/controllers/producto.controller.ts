import { Request, Response} from 'express';
import {Op, where } from 'sequelize';
import { TProducto, Unidad_Medida, Producto} from '../associations/producto.associations';
import GenericError from '../models/errors/error';


// TIPO DE PRODUCTO
//crear producto
export const postProducto = async(req: Request, res: Response)=>{
    const {id_categoria, nombre, descripcion="", can_minima, tipo, medida ="", cantidad=""} = req.body;
    let medidaProducto:any;
    try{  
           const producto:any = await TProducto.create({
                id_categoria,
                nombre,
                descripcion,
                can_minima,
                tipo
            });

            if(tipo == "Equipo"){
                await Producto.create({
                id_tipoprod: producto.id_tipoprod, 
                cantidad
              });
            }

            if(tipo == "Insumo Medico"){
                switch (medida) {
                    case "unidad":
                       medidaProducto =  await Unidad_Medida.create({
                            id_tipoprod: producto.id_tipoprod,
                            unidad: true
                        });
                        
                        break;
     
                    case "caja":
                        medidaProducto =  await Unidad_Medida.create({
                             id_tipoprod: producto.id_tipoprod,
                             caja: true
                         });
                         break;
                
                    default:
                        break;
                }
            }
          

            return res.status(201).json({
            ok: true,
            msg: "Registro de producto exitoso", 
            producto: {
                producto, 
                medida: medidaProducto,         
            }
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
            return res.status(500).json({  
                errors: "Ha ocurrido un error contácte con el administrador"      
            }); 
        } 
    }   
}

//actualizar producto
export const putProducto = async(req: Request, res: Response)=>{
    const {id=""} = req.params;
    const {nombre ="", descripcion="", can_minima =""} = req.body;

    try{  
        const tipo_producto:any = await TProducto.findOne({
            where:{
                id_tipoprod:id
            }
        });   
    
        const producto = await TProducto.update({
            nombre:(nombre!="")?nombre:tipo_producto.nombre,
            descripcion: (descripcion!="")?descripcion:tipo_producto.descripcion,
            can_minima: (can_minima != "")?can_minima:tipo_producto.can_minima,
        },{
            where:{
                id_tipoprod:id
            }
        });
        
        
        
        if(producto[0] == 0){
            const obj = new GenericError('id', 'No se encontraron registros para actualizar');
            return res.status(400).json({
                errors: obj.ErrorObj
            })
        }
        
        res.status(201).json({
            ok: true,
            msg: "Actualización de producto exitoso", 
            producto
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
            return res.status(500).json({  
                errors: "Ha ocurrido un error contácte con el administrador"      
            }); 
        } 
    }  

    
}

//eliminar producto 
export const deleteProducto = async(req: Request, res: Response) =>{
    const {id= ""} = req.params; 
    console.log(id);
    try{
        
        const producto:any = await TProducto.update({
            estado:false
        },{
            where: {
                id_tipoprod:id
            }, 
        }); 

        
        if(producto[0] == 0) {
            const obj = new GenericError('id', "No se encontraron registros");
            return res.status(404).json({
               errors: obj.ErrorObj
            })
        }

        const productos = await Producto.update({
            disponibilidad: false
        },{
            where:{
                id_tipoprod:id
            }
        })

        if(!productos){
            res.status(400).json({
                ok: false, 
                msg: "No se pudo eliminar el producto"
            })
        }        
    
        res.status(200).json({
            ok:true,
            msg: "Eliminacion exitosa", 
            producto
        })
    
    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors: "Ha ocurrido un error contactate con el administrador"
        })
    }
  

}

//obtener producto 
export const getProducto = async(req: Request, res: Response)=>{
    try{
        const {id= ""}:any = req.params;  
        const producto = await TProducto.findOne({
            where: {
                id_tipoprod: id
            }
        });

        if(!producto) {
            const obj = new GenericError('id', "No se encontraron registros");
            return res.status(404).json({
               errors: obj.ErrorObj
            })
        }

        res.status(200).json({
            ok: true,
            msg: "Búsqueda exitosa", 
            producto
        })
    }catch(error){
        console.log(error); 
        res.status(500).json({
            msg:"Ha ocurrido un error contácte con el administrador"
        })
    }
    
}

//consultar productos  POR VERIFICAR
export const getProductos = async (req: Request, res: Response)=>{
    const {termino}  = req.params;
    const {inicio= 0, fin = 3} = req.query

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
            },
            offset: Number(inicio),
            limit: Number(fin)
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
            msg: "Ha ocurrido un error contácte con el administrador", 
        });
    }
}


// PRODUCTOS CON FECHA DE CADUCIDAD




