import {Router} from 'express'; 
import { postRegistroProducto } from '../controllers/registro_producto.controller';
import { putProductoCaducidad } from '../controllers/producto_caducidad.controller';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar_campos';
import { isUserApp } from '../middlewares/validar_rol';
import { validarJWT } from '../middlewares/validar_jwt.middleware';
import { existeRegistro } from '../middlewares/validar_campos_reporte';


const router = Router(); 

router.post('',[
    validarJWT,
    isUserApp,
    check('id')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({min: 36, max:36}).withMessage("El id no es válido"),
    check('cant_consumo')
        .optional({nullable:true})
        .isInt({min: 0}).withMessage("La cantidad de consumo debe ser mayor o igual a cero"),
    check('id_reporte')
        .exists().withMessage("El id del reporte es obligatorio")
        .isUUID(4).withMessage("Identificador no válido")
        .isLength({min:36, max: 36}).withMessage("Idetificador no válido"),
    check('carga')
        .optional({nullable:true})
        .isInt({min: 0}).withMessage("El valor mínimo de la carga es 0"),
    validarCampos, 
    existeRegistro
], postRegistroProducto);





//obtencion de datos de productos por nombre

export default router;
