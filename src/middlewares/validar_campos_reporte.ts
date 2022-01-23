import { Request, Response, NextFunction } from "express";
import { noExtendLeft } from "sequelize/types/lib/operators";
import GenericError from '../models/errors/error';
import Trabaja from '../models/trabaja.model';

export const  ExistAuthorAmbulance = async(req:Request, res: Response, next: NextFunction)=>{
    const {cedula, placa, fecha} = req.body
    const author = await Trabaja.findOne({
        where: {
            cedula, 
            placa,
            rol: "Paramedico", 
            fecha_inicio:fecha
        }
    });
    console.log(author);

    if(author){
        const obj = new GenericError('Paramédico', `Usted ya tiene un reporte en proceso para la ambulancia ${placa}`); 
        return res.status(400).json({
            errors: obj.ErrorObjt
        })
    }
    next();
}