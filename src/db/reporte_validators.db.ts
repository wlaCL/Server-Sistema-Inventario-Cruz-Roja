import Reporte from '../models/reporte.model';


export const existReport = async(id = "")=>{
    const reporte:any = await Reporte.findByPk(id);
    if(!reporte){
        throw new Error("No existe un reporte válido")
    }
}

export const existReportFinish = async(id = "")=>{
    const reporte:any = await Reporte.findByPk(id);
    if(!reporte.base){
        throw new Error("El reporte no ha sido finalizado")
    }
}