import Producto_Ambulancia from '../models/producto_ambulancia';
import { Request, Response, NextFunction } from 'express';
import GenericError from '../models/errors/error';
import { Producto } from '../associations/producto.associations';
import TProducto from '../models/tipo_producto.model';
import { where } from 'sequelize';

export const existeProductoAmbulancia = async(req:Request, res:Response, next:NextFunction)=>{  
  const {placa="", id_producto=""} = req.body;
  const producto = await Producto_Ambulancia.findOne({
      where:{
          id_producto, 
          placa, 
          estado: true
      }
  }); 

  if(producto){
     return  res.status(400).json({
          ok: false, 
          msg: `El produco ya se encuenta asignado a la placa ${placa}`
      })
  }
  next();
}


//VALIDAMOS QUE EN LA PETICIÓN  LA CANTIDAD INGRESADA POR EL USUARIO NO SEA MAYOR A LA CANTIDAD REGISTRADA EN LA TABLA PRODUCTO 
export const verifyCantProductoAmbulancia = async(req:Request, res:Response, next:NextFunction)=>{
  const {id_producto ="", cant_ambulancia} = req.body; 

  const producto:any = await Producto.findOne({
    where: {
      id_producto
    }
  }); 
  if(producto.cantidad < cant_ambulancia){
    return res.status(400).json({
      ok:  false, 
      msg: "La cantidad no puede ser mayor a la registrada incialmente en el producto"
    });
  }  
  next();
}

export const verifySumCantProductoAmbulancia = async (req:Request, res:Response, next: NextFunction)=>{
  var suma = 0;
  const {id_producto ="",  cant_ambulancia = ""} = req.body; 
  const {rows}:any = await Producto_Ambulancia.findAndCountAll({
    attributes: ['cant_ambulancia'],
    where: {
      id_producto, 
      estado: true
    }
  }); 

  const producto:any = await Producto.findByPk(id_producto);

  if(rows.length > 0){
    //console.log("soy los productos: ", rows[0].dataValues.cant_ambulancia);
    for (let i in rows){
      suma  = suma + rows[i].dataValues.cant_ambulancia;
    }
  } 

  const unidad_disponible = producto.cantidad - suma; 
  if(unidad_disponible == 0){
    return res.status(400).json({
      ok: false, 
      msg: "No existe stock disponible"
    });   
  }
  
  if (cant_ambulancia > unidad_disponible){
    return res.status(400).json({
      ok: false, 
      msg: `Stock disponible ${unidad_disponible}`
    });    
  }
  next();
}

export const existRegisterProductAmbulancia  = async(req:Request, res:Response, next: NextFunction)=>{
  const {placa="", id_producto=""} = req.body;
  const producto = await Producto_Ambulancia.findOne({
      where:{
          id_producto, 
          placa, 
          estado: true
      }
  }); 

  if(!producto){
     return  res.status(404).json({
        ok: false, 
        msg: "Producto no encontrado"
      })
  }
  next();

}


export const existeNombreProductoAmbulancia = async(req:Request, res:Response, next: NextFunction)=>{
  const {id = "", nombre = "", placa=""}= req.body;
  const producto:any = await TProducto.findOne({
    include:[
      {        
        model:Producto,
        where:{
          estado:true,
        },
        include:[
          {
            model: Producto_Ambulancia, 
            where:{
              estado:true, 
              placa
            }
          }
        ],
      }
    ], 
    where:{
      estado:true, 
      nombre,
    }
  });
  
  if(producto){
    return res.status(400).json({
      ok:false, 
      msg: `El producto ya se encuentra registrado con la placa  ${placa}`,
      producto
    })
  }
  next();

}