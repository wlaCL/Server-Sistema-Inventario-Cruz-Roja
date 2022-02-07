import { Request, Response } from "express";
import { Op } from "sequelize";
import {Ambulancia} from '../models/models';
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
                ok: true,
                msg:"Ambulancia registrada exitósamente", 
                ambulancia
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error contáctate con administrador"
        })
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
           ok: true,
           msg: "Eliminación exitósa",
           ambulancia
       })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error contáctate con administrador"
        })
    }
}


// actulizar ambulancia 
export const actualizarAmbulancia = async(req:Request, res: Response) =>{    
    const {placa} = req.params; 
    const {descripcion = "", num_vehiculo = ""} = req.body; 
    
    try{
        const amb:any = await Ambulancia.findByPk(placa);

        const ambulancia = await Ambulancia.update(
            {
                descripcion: (descripcion != "")? descripcion: amb.descripcion, 
                num_vehiculo : (num_vehiculo != "")? num_vehiculo: amb.num_vehiculo,
            },{
                where:{
                    placa
                }
            }
        );

    
        res.status(200).json({
            ok:true,
            msg: "Actualización de datos de ambulancia", 
            ambulancia
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error contáctate con administrador"
        });
    }    
}

//Busqueda de ambulancia
export const obtenerAmbulancia =async (req:Request, res:Response) => {
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
            ok:true,
            msg:"Búsqueda éxitosa", 
            ambulancia
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error contáctate con administrador"
        });
    }   
}

export const obtenerAmbulancias = async (req: Request, resp: Response)=>{
    try{
        const ambulancias:any =await Ambulancia.findAll({
            where:{
                estado: true
            }
        });
        console.log(ambulancias);

        if(ambulancias.length == 0 ){
            return resp.status(400).json({
                ok: false, 
                msg: "No se han econtrado resultados",
                ambulancias :[]
            });
        }

        resp.status(200).json({
            ok: true, 
            msg: "Resultados encontrados", 
            ambulancias
        });

    }catch(error){
        console.log(error); 
        resp.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }    
}