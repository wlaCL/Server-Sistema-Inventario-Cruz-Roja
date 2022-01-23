import Producto_Ambulancia from '../models/producto_ambulancia';
import { Request, Response, NextFunction } from 'express';
import GenericError from '../models/errors/error';
import { Producto } from '../associations/producto.associations';

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
    const obj = new GenericError('id_producto, placa', `El producto ya se encuentra asignado a la placa ${placa}`);
     return  res.status(400).json({
          errors: obj.ErrorObjt
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
    const obj = new GenericError('cantidad', 'Cantidad no puede ser mayor a la registrada incialmente en el producto '); 
    return res.status(400).json({
      errors: obj.ErrorObj,
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
    const obj = new GenericError('cant_ambulancia', 'No existe stock disponible');
    return res.status(400).json({
      errors: obj.ErrorObjt
    });   
  }
  
  if (cant_ambulancia > unidad_disponible){
    const obj = new GenericError('cant_ambulancia', `Stock disponible ${unidad_disponible}`);
    return res.status(400).json({
      errors: obj.ErrorObjt
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
    const obj = new GenericError('id_producto, placa', `No existe el producto que intenta eliminar`);
     return  res.status(400).json({
          errors: obj.ErrorObjt
      })
  }
  next();

}