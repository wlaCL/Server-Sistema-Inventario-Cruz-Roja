import { Router } from "express";
import { putProducto, postProducto, getProductoTodos, deleteProducto, getProductos} from '../controllers/producto.controller';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar_campos';
import { existeCategoriaID } from '../db/categoria_validators.db';
import { ExisteTipoProductoID, ExisteProductoNombre, existeProductoFechaCaducidad, existeProductoCaducidadID, permiteProductoCaducidad } from '../db/producto_validators.db';
import { validarTipoUnidad, validarCantidadEquipos } from '../middlewares/validar_campos_productos';
import { postProductoCaducidad, putProductoCaducidad, deleteProductoCaducidad} from "../controllers/producto_caducidad.controller";
import { validarJWT } from '../middlewares/validar_jwt.middleware';
import { isUserWeb, isUserApp } from '../middlewares/validar_rol';
import { existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { crearProductoApp } from "../controllers/productos.app.controller";
import { existeNombreProductoAmbulancia } from '../middlewares/validar_campos_producto_ambulancia';
const router = Router(); 


//RUTAS PARA EL PRODUCTO 
//crear producto 
//nota se pide la cantidad  en obligaoria si se regisra un equipo 
router.post('',[
    validarJWT, 
    isUserWeb,
    check('id_categoria')
        .exists().withMessage("El id_categoria es obligatorio")
        .isUUID(4).withMessage("No es un id_válido"),
    check('nombre')
        .exists().withMessage("El nombre es obligatorio"),
    check('tipo')
        .exists().withMessage("El tipo de producto es obligatorio")
        .isIn(['Insumo Medico', 'Equipo']).withMessage("El tipo de producto no es válido ['Insumo Medico', 'Equipo']"),
    check('can_minima')
        .exists().withMessage("La cantidad Minima es obligatoria")
        .isNumeric().withMessage("La cantidad debe ser un número"),
    check('medida')
        .optional({nullable: true})
        .isIn(['caja', 'unidad']).withMessage("El tipo de medida no es válido ['caja', 'unidad']"),
    check('cantidad')
        .optional({nullable: true})
        .isNumeric().withMessage("La cantidad debe ser un número") 
        .isInt({min: 1}).withMessage("El número debe ser mayor o igual a 1"),        
    check('id_categoria').custom(existeCategoriaID),
    check('nombre').custom(ExisteProductoNombre),
    validarCampos,
    validarTipoUnidad,
    validarCantidadEquipos 
] ,postProducto);

//actualizar el producto
router.put('/:id', [
    validarJWT, 
    isUserWeb,
    check('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"), 
    check('nombre')
        .optional({nullable: true})
        .matches(/^[A-Za-z\s]+$/).withMessage("No es un nombre válido"),
    check('can_minima')
        .optional({nullable: true})
        .isInt({min:0}).withMessage("El número debe ser positivo")
        .isNumeric().withMessage("La cantidad debe ser un número"),        
    check('id').custom(ExisteTipoProductoID),
    check('nombre').custom(ExisteProductoNombre),
    validarCampos    
],putProducto)

//obtener todos los productos
router.get('',[
    validarJWT, 
    validarCampos
],getProductoTodos);

//eliminar producto
router.delete('/:id',[
    validarJWT, 
    isUserWeb,
    check('id')
    .isUUID(4).withMessage("El id no es valido"), 
    check('id').custom(ExisteTipoProductoID),
    validarCampos
] ,deleteProducto);




//Todo usar en el app pasra la consulta 
//consultar todos los productos por nombre
router.get('/busqueda/:termino',[
    validarJWT,
    check('termino')
        .matches(/^[A-Za-z\s]+$/).withMessage("Se necesita un nombre válido"),
    validarCampos,
],getProductos)



//RUTAS PARA LAS PRODUCTOS CON FECHA DE CADUCIDAD

router.post('/caducidad', [
    validarJWT, 
    isUserWeb,
    check('id_tipoprod')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"), 
    check('fecha_caducidad')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("no es una fecha válida"),
    check('cantidad')
        .exists().withMessage("La cantidad es obligatoria")
        .isNumeric().withMessage("La cantidad debe ser un número") 
        .isInt({min: 1}).withMessage("El número debe ser mayor o igual a 1"),
    check('fecha_caducidad').custom(existeProductoFechaCaducidad), 
    check('id_tipoprod').custom(ExisteTipoProductoID),
    check('id_tipoprod').custom(permiteProductoCaducidad), 
    validarCampos
], postProductoCaducidad);


router.put('/caducidad/:id',[
    validarJWT, 
    isUserWeb,
    check('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"),
    check('cantidad')
        .optional({nullable: true})
        .isNumeric().withMessage("La cantidad debe ser un número") 
        .isInt({min: 1}).withMessage("El número debe ser mayor o igual a 1"),  
    check('id').custom(existeProductoCaducidadID),   
    validarCampos  
],putProductoCaducidad);

router.delete('/caducidad/:id',[
    validarJWT, 
    isUserWeb,
    check('id')
    .exists().withMessage("El id es obligatorio")
    .isUUID(4).withMessage("No es un id válido"),
    check('id').custom(existeProductoCaducidadID),
    validarCampos
],deleteProductoCaducidad,);



//creación del producto desde la app movil
// El control id de la categoria recae en la aplicacion
router.post('/app',[
    validarJWT, 
    isUserApp,
    check('id')
        .exists().withMessage("El id de la categoria es obligatorio")
        .isUUID(4).withMessage("El id es obligatorio"),
    check('nombre')
        .exists().withMessage("El nombre es obligatorio"),
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({min: 7, max: 7}).withMessage("La placa debe contener 7 caracteres"),  
    check('cantidad')
        .exists() 
        .isNumeric().withMessage("La cantidad debe tener solo números")
        .isInt({min: 1}).withMessage("La cantidad debe ser un mayor o igual a uno"),        
    check('tipo')
        .exists().withMessage("Es obligatorio el tipo"),
    check('tipo')
        .exists().withMessage("El tipo de producto es obligatorio")
        .isIn(['Insumo Medico', 'Equipo']).withMessage("El tipo de producto no es válido ['Insumo Medico', 'Equipo']"),
    check('placa').custom(existeAmbulanciaValida),
    validarCampos,
    existeNombreProductoAmbulancia
],crearProductoApp)
export default router; 