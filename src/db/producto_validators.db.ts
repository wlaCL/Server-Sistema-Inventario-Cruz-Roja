import {Producto, TProducto, Categoria} from '../associations/producto.associations'

export const ExisteProductoNombre = async(nombre = "")=>{
    const producto = await TProducto.findOne({
        where: {
            nombre, 
            estado:true
        }
    });

    if(producto){
        throw new Error(`Ya existe un producto registrado con el nombre ${nombre}`)
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
        throw new Error("El producto no se encuetra registrado");
    }

    const categoria = await Categoria.findOne({
        where:{
            id_categoria: producto.id_categoria, 
            estado: true
        }
    });

    if(!categoria){
        throw new Error("El producto no se encuetra registrado");
    }
}

//PRODUCTOS CON FECHA DE CADUCIDAD
//verifica si el producto que se quiere registrar ya está ingresado
export const existeProductoFechaCaducidad = async(fecha="")=>{
    const producto = await Producto.findOne({
        where: {
            fecha_caducidad:fecha, 
            estado:true
        }
    })

    if(producto) {
        throw new Error("El producto ya cuenta con la fecha de caducidad indicada");
    }
}

export const existeProductoCaducidadID = async(id="")=>{
    const producto:any = await Producto.findOne({
        where: {
            id_producto:id, 
            estado:true
        }
    })
    if(!producto){
        throw new Error("El producto no se encuentra registrado")
    }

    const tipo_producto:any = await TProducto.findOne({
        where:{
            id_tipoprod: producto.id_tipoprod, 
            estado: true
        }
    })

    if(!tipo_producto){
        throw new Error(" El producto no se encuentra registro")
    }

    const categoria = await Categoria.findOne({
        where:{
            id_categoria: tipo_producto.id_categoria, 
            estado: true
        }
    });

    if(!categoria){
        throw new Error("El producto no se encuetra registrado");
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