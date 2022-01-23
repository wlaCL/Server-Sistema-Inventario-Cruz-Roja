import {Producto, TProducto, Categoria} from '../associations/producto.associations'

export const ExisteProductoNombre = async(nombre = "")=>{
    const producto = await TProducto.findOne({
        where: {
            nombre, 
            estado:true
        }
    });

    if(producto){
        throw new Error("Ya existe un producto registrado")
    }
}

export const ExisteTipoProductoID = async(id= "")=>{
    const producto:any = await TProducto.findOne({
        where: {
            id_tipoprod:id, 
            estado:true
        }
    }); 

    if(!producto){
        throw new Error("No existen registros");
    }

    console.log( "soy el producto : ", producto);

    const categoria = await Categoria.findOne({
        where:{
            id_categoria: producto.id_categoria, 
            estado: true
        }
    });

    console.log("soy la categoria")
    
    if(!producto){
        throw new Error("No existen registros");
    }
    
}

//PRODUCTOS CON FECHA DE CADUCIDAD
export const existeProductoFechaCaducidad = async(fecha="")=>{
    const producto = await Producto.findOne({
        where: {
            fecha_caducidad:fecha, 
            disponibilidad:true
        }
    })

    if(producto) {
        throw new Error("El producto ya cuenta con la fecha de caducidad indicada");
    }
}

export const existeProductoCaducidadID = async(id="")=>{
    const producto = await Producto.findOne({
        where: {
            id_producto:id, 
            disponibilidad:true
        }
    })
    console.log(producto);
    if(!producto){
        throw new Error("El producto no se encuentra registrado")
    }
}

export const permiteProductoCaducidad = async (id = "")=>{
    const producto:any = await TProducto.findOne({
        where:{
            id_tipoprod:id,
            estado:true,
            tipo: "Equipo"
        }
    });

    if(producto){
        throw new Error(`El producto no permite asignar fecha de caducidad tipo de producto: ${producto.tipo}`)
    }
}