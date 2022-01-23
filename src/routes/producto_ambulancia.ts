import {Router} from 'express';
import { check } from 'express-validator';
import { postProductoAmbulancia, deleteProductoAmbulancia, getProductosAmbulancia } from '../controllers/producto_ambulancia.controller';
import {existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { validarCampos } from '../middlewares/validar_campos';
import { existeProductoAmbulancia, verifyCantProductoAmbulancia, verifySumCantProductoAmbulancia, existRegisterProductAmbulancia } from '../middlewares/validar_campos_producto_ambulancia';
import { exiteProductoCaducidad} from '../db/producto_ambulancia.db';
import { ExisteTipoProductoID } from '../db/producto_validators.db';

const router = Router(); 

router.post('', [
    check('cant_ambulancia')
        .exists().withMessage("la cantidad del producto de ambulancia es obligatorio")
        .isInt({min: 1}).withMessage("La cantidad debe ser mayor o igual 1"),
    check('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido"),
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({min: 7, max: 7}).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    check('placa').custom(existeAmbulanciaValida),
    check('id_producto').custom(exiteProductoCaducidad),
    validarCampos,
    existeProductoAmbulancia,
    verifyCantProductoAmbulancia, 
    verifySumCantProductoAmbulancia      
],postProductoAmbulancia); 

router.delete('',[
    check('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido"),
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({min: 7, max: 7}).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    check('placa').custom(existeAmbulanciaValida),
    check('id_producto').custom(exiteProductoCaducidad),
    validarCampos, 
    existRegisterProductAmbulancia 
], deleteProductoAmbulancia);



router.get('',[
    check('id')
    .isUUID(4).withMessage("El id no es valido"),   
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({min: 7, max: 7}).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
        check('id').custom(ExisteTipoProductoID),
    check('placa').custom(existeAmbulanciaValida),   
    validarCampos
],getProductosAmbulancia)

export default router; 




