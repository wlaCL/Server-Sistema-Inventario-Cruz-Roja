import Ambulancia from '../models/ambulancia.model';

export const exiteAmbulanciaPlaca = async(placa = "") =>{
    
    const ambulancia  = await Ambulancia.findByPk(placa); 
    if(ambulancia){
        throw new Error("Ya existe un vehículo registrado con la placa ingresada")
    }
}

export const existeAmbulanciaNumVehiculo = async(num_vehiculo = "") =>{
    const ambulancia  = await Ambulancia.findOne({
        where:{
            num_vehiculo, 
            estado:true
        }
    }); 

    if(ambulancia){
        throw new Error("Ya existe una ambulancia con el número de vehículo ingresado")
    }
}


export const existeAmbulanciaValida =async(placa="")=>{
    const ambulancia = await Ambulancia.findOne({
        where:{
            placa,
            estado:true
        }
    });
    if(!ambulancia){
        throw new Error("No existen registros")        
    }
}