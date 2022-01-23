//const { request, response } = require("express");
//const jwt = require('jsonwebtoken');
//import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Persona } from '../models/models';
import { NextFunction,Response} from "express";
import { IGetUserAuthInfoRequest } from '../utils/request.util';

export const validarJWT = async(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction)=> {
    //const token = req.header('x-token');
    const token = req.header('x-token');
    console.log(token);


    if(!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
   

    try{
        console.log('1');
        const {cedula}:any = jwt.verify(token, 'q7497437_U&#UEOUEW@$%');

        //console.log(jwt.verify('vi', token, process.env.SECRETORPRIVATEKEY))
        //console.log('1');

        const id = cedula;
        const usuario:any = await Persona.findByPk(id)
        req.user= usuario;
        console.log(usuario)
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido -- no se encuentra registrado en la base de datos'
            });
        }
        
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido -- eliminado'
            });
        }


        //req.usuario = usuario;
        //req.uid = uid;
        
    }catch(error){

    }
    next();
}

