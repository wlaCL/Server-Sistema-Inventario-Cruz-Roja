import {Categoria} from "../associations/producto.associations"
import GenericError from "../models/errors/error";
import { NextFunction } from 'express';

export const existeCategoriaNombre = async(nombre="")=>{    
    const categoria = await Categoria.findOne({
        where:{
            nombre,
            estado:true
        } 
    }); 

    if(categoria){
        throw new Error("Ya existe categoria registrada con el nombre ingresado")
    } 
}

export const existeCategoriaID = async(id="")=>{
    const categoria = await Categoria.findOne({
        where: {
            id_categoria:id, 
            estado:true
        }
    })
    
    if(!categoria){
        throw("No se han encontrado registros con el id de categoria ingresado")
    }
}

