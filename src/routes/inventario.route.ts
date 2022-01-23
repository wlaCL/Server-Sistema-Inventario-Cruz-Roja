import {Router} from 'express'; 
import { postRegistroProducto } from '../controllers/registro_producto.controller';
import { putProductoCaducidad } from '../controllers/producto_caducidad.controller';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar_campos';
import { existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { exiteProductoCaducidad } from '../db/producto_ambulancia.db';

const router = Router(); 

router.post('',[
    check('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({min: 36, max:36}).withMessage("El id no es válido"),
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({min: 7, max: 7}).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    check('cant_consumo')
        .exists().withMessage("La cantidad de consumo es obligatoria")
        .isInt({min: 0}).withMessage("La cantidad de consumo debe ser mayor o igual a cero"),
    check('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),
    check('placa').custom(existeAmbulanciaValida),
    check('id_producto').custom(exiteProductoCaducidad),
    validarCampos
], postRegistroProducto);

export default router;
