import {Trabaja, Reporte} from '../associations/reporte.associations';

import { Request, Response } from "express";
import moment from 'moment';
import Usuario from '../models/usuario.model';
import { where } from 'sequelize/types';
import Persona from '../models/persona.model';
import axios from 'axios';
import { Op } from 'sequelize';
import Registro_Producto from '../models/registro_producto';


export const postReporte = async(req:Request, res:Response)=>{
    

    const {placa="",fecha=""} = req.body;
    const cedula = req.user;
  
    
    try{
        const trabaja:any = await Trabaja.create({
            placa, 
            cedula, 
            fecha_inicio: moment(fecha, "YYYY-MM-DD").format(), 
            fecha_fin:  moment(fecha,"YYYY-MM-DD").format(), 
            rol: "Paramedico"
        });
    
        if(!trabaja){
            return res.status(400).json({
               ok:false, 
               msg: "No se ha podido registrar el reporte"
            });        
        }
        console.log(`trabaja $trabaja`);

        const reporte: any = await Reporte.create({
            id_trabaja: trabaja.id_trabaja, 
            fecha: moment(trabaja.fecha_inicio, "YYYY-MM-DD").format(), 
            placa: trabaja.placa
        });

        res.status(200).json({
            ok: true,
            msg: "Registro existoso", 
            reporte
        });

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors:{
                ok: false, 
                msg: "Ha ocurrido un error contáctate con el administrador"
            }
        })
    };  
}


export const putReporte  = async (req:Request, res:Response) =>{
    const {novedades="", base="", asistente="", conductor="", id=""} = req.body;
    const api = 'key=AAAA29qNbZc:APA91bEEX9oibqT5-n5wyxl8_OxleGEiPEx2BQ6Be_IeyVjPNoNlqT0cuc1R2ImoLZPKY09IjJ-uswDOZGeCA5dxjmCfWQsHd27I2z0lhCsVRjYOy7MOs7Y7JXHi3SamhkqrdGPmCgiW';

    try{
        const devices:any = [];
        const report:any = await Reporte.findByPk(id);

        if(report.base != null ){
            return res.status(401).json({
                ok:false,
                msg: "No tienes permisos"
            });            
        }

        const reporte = await Reporte.update({
            novedades, 
            base, 
            asistente, 
            conductor
        },{where:{
            id_reporte: id
        }});

        const userNotifieresReport:any = await  Persona.findAll(
            {
                attributes:['cedula'], 
                include:[
                    {
                        model: Usuario, 
                        attributes:['dispositivo'], 
                        where:{
                            roles_sistema: 'user_app'
                        }
                    }
                ],
                where:{
                    estado:true, 
                }
            },           
        ); 
        
        for (let index = 0; index < userNotifieresReport.length; index++) {
            const element = userNotifieresReport[index].usuarios[0].dispositivo;
            if(element == null){
                continue
            }
            devices.push(element);        
        }
        


        if(!reporte){
            return res.status(400).json({
                ok:false, 
                msg: "No se ha podido finalizar el reporte"                
            });
        }

       /* res.status(200).json({
            ok: true, 
            msg: "Reporte finalizado exitosamente", 
            reporte
        })*/
        const re:any = await Reporte.findByPk(id);
        
        for (let index = 0; index < devices.length; index++) {
            const element = devices [index];
            await  axios({
                method: 'post', //you can set what request you want to be
                url: 'https://fcm.googleapis.com/fcm/send',
                data:{
                    notification: {
                        "body": `Se ha generado exitósamente el reporte con placa ${re.placa} y fecha ${re.fecha}` ,
                        "title": "Creacion de Reporte"
                    },
                    priority: "high",  
                    to: element                    
                },
                headers: {
                    //'Content-Type': 'application/json'
                  Authorization: api
                }
              })
            
        }
       

        res.status(200).json({
            ok: true, 
            msg: "Reporte finalizado exitosamente", 
            reporte
        })

    }catch(error){
        console.log(error); 
        res.status(500).json({
            errors:{
                ok: false, 
                msg: "Ha ocurrido un error contáctate con el administrador"
            }
        });
    }   
}

export const getReporte = async (req:Request, res:Response)=>{
   const cedula:any = req.user; 
   const {fecha="", placa}= req.body;
    try{
        const turno:any = await Trabaja.findOne({
            where:{
                cedula,
                fecha_inicio:fecha,
                placa 
            }
        });
     
        if(!turno){
            return res.status(404).json({
                ok: false,
                msg: "Aun no has registrado el reporte",             
            });
        }
     
        const reporte:any = await Reporte.findOne({
            where:{
                id_trabaja: turno.id_trabaja
            }
        });     
      
         if(reporte.base == null){
             return res.status(400).json({
                ok: false,
                msg: "No ha finalizado el reporte",
                reporte
             }); 
         }
      
         res.status(200).json({
             ok: true, 
             msg: "El reporte ya se encuentra registrado", 
            reporte
         });

    }catch(error){
       console.log(error); 
       res.status(500).json({
           errors:{
               ok: false, 
               msg: "Ha ocurrido un error contáctate con el administrador"
           }
       });
   }
}


export const searchReport =async (req:Request, res:Response)=>{
    const {fecha = "", placa = ""} = req.query; 
    try{
        const reportes:any = await Reporte.findAll({
            include:[
                {
                    model: Registro_Producto, 
                    where:{}
                }, 
                {
                    model: Trabaja,
                    include:[
                        {
                            model: Persona
                        }
                    ]
                }
            ], 
            where:{
                placa, 
                fecha, 
                base:{
                   [Op.not]:null
                }
            }
        });

        if(reportes.length === 0){
            return res.status(404).json({
                ok: false, 
                msg: 'No se han encontrado resultados'
            });
        }

        res.status(200).json({
            ok: true, 
            msg: 'Consulta exitosa',
            reportes
        });
    }catch{
        res.status(500).json({
            ok:false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }
}