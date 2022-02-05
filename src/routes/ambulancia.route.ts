import { Router} from "express";
import { check } from "express-validator";
import { postAmbulancia, eliminarAmbulancia, actualizarAmbulancia, obtenerAmbulancia, obtenerAmbulancias } from '../controllers/ambulancia.controller';
import { validarCampos } from '../middlewares/validar_campos';
import { exiteAmbulanciaPlaca, existeAmbulanciaNumVehiculo, existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { validarCamposAmbulancia } from '../middlewares/validar_campos_ambulancia';
import { validarJWT } from '../middlewares/validar_jwt.middleware';
import { isUserWeb } from '../middlewares/validar_rol';

const router = Router(); 

router.post('', [
    validarJWT,
    isUserWeb,
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
        .isLength({min:7, max:7}).withMessage("La placa debe contener 7 caracteres"), 
    check('num_vehiculo')
        .exists().withMessage("El número de vehículo es obligatorio")
        .isNumeric().withMessage("El número de vehículo solo puede contener números")
        .isInt({min:1,}).withMessage("El número de vehículo debe ser positivo")
        .isLength({min:1, max:10}).withMessage("El número de vehículo no debe sobrepasar los 10 digitos"),
    check('placa').custom(exiteAmbulanciaPlaca), 
    check('num_vehiculo').custom(existeAmbulanciaNumVehiculo),
    validarCampos       
], postAmbulancia);

router.delete('/:placa',[
    validarJWT,
    isUserWeb,
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
        .isLength({min:7, max:7}).withMessage("La placa debe contener 7 caracteres"),
    check('placa').custom(existeAmbulanciaValida),
    validarCampos,      
], eliminarAmbulancia)


//actualizar datos de ambulancia
router.put('/:placa', [
    validarJWT,
    isUserWeb,
    check('placa')
    .exists().withMessage("La placa es obligatoria")
    .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
    .isLength({min:7, max:7}).withMessage("La placa debe contener 7 caracteres"),
    check('placa').custom(existeAmbulanciaValida),
    check('num_vehiculo')
        .optional({nullable:true})
        .isNumeric().withMessage("El número de vehículo solo puede contener números")
        .isInt({min:1,}).withMessage("El número de vehículo debe ser positivo"),        
    check('num_vehiculo').custom(existeAmbulanciaNumVehiculo),
    validarCampos, 
    //validarCamposAmbulancia
], actualizarAmbulancia)

//obtener datos de ambulancia
router.get('/:termino',[
    validarJWT,
    isUserWeb,
    validarCampos, 
], obtenerAmbulancia); 

router.get('',[validarJWT, validarCampos], obtenerAmbulancias);

export default router; 