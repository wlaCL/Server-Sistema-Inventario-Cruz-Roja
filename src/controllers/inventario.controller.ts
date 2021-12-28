import { Request, Response } from "express";

export const postInventario = async(req:Request, res:Response) =>{
    res.status(200).json({
        msg: "soy el post inventario"
    })
}