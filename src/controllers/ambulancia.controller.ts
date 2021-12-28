import { Request, Response } from "express";
import { Op } from "sequelize";
import {Ambulancia} from '../models/index.model';
import GenericError from "../models/errors/error";



//crear ambulancia
export const postAmbulancia = async(req:Request, res:Response) =>{
    try{
        const {placa, num_vehiculo, descripcion} = req.body; 
        const ambulancia = await Ambulancia.create({
            placa, 
            num_vehiculo, 
            descripcion, 
        }); 
       
        if(ambulancia){
            return res.status(400).json({
                msg:"Ambulancia registrada exitósamente", 
                ambulancia
            });
        }
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


//Eliminar ambulancia medinante placa
export const eliminarAmbulancia = async(req:Request, res:Response) =>{
    try{
        const {placa} = req.params;
        const ambulancia = await Ambulancia.update({estado:false},{
            where:{
                placa, 
                estado:true
            }
        });

       res.status(200).json({
           msg: "Eliminación exitósa",
           ambulancia
       })


    }catch(error){
        console.log(error); 
        res.status(500).json({
            Errors: "Ha ocurrido un error contáctate con el administrador"
        });
    }
}


// actulizar ambulancia 
export const actualizarAmbulancia = async(req:Request, res: Response) =>{    
    const {placa} = req.params; 
    const {descripcion, num_vehiculo} = req.body; 
    
    try{
        const ambulancia = await Ambulancia.update(
            {
                descripcion, 
                num_vehiculo
            },{
                where:{
                    placa
                }
            }
        );
    
        res.status(200).json({
            msg: "Actualización de datos de ambulancia", 
            ambulancia
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
                errors: "Ha ocurrido un error contáctate con el administrador"      
            }); 
        }  
    }
    
}

//Busqueda de ambulancia
export const obtenerAmbulancia=async (req:Request, res:Response) => {
    const {termino} = req.params; 

    try{
        const ambulancia = await Ambulancia.findOne({
            where: {
            [Op.and]:{
                [Op.or]:{
                    placa:termino, 
                    num_vehiculo: termino,             
                    }
                },
                estado: true
            },             
            attributes: {exclude:['estado']}
        });

        if(!ambulancia){
            const obj  = new GenericError(termino, "No existen registros");
            return res.status(404).json({
                errors: obj.ErrorObjt
            })
        }
        res.status(200).json({
            msg:"Búsqueda éxitosa", 
            ambulancia
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors: "Ha ocurrido un error contactate con el administrador"
        })
    }   
}
