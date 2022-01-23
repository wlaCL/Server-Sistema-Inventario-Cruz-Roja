import {Router} from "express";
import { check } from "express-validator";
import { usuarioActivo, existeUsuario } from '../db/usuario_validators.db';
import { existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { postAuthorInventory, getReporte} from '../controllers/reporte.controller';
import { validarCampos } from '../middlewares/validar_campos';
import { ExistAuthorAmbulance } from '../middlewares/validar_campos_reporte';
const router = Router(); 


router.post('',[
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({min: 7, max: 7}).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    check('cedula')
        .exists().withMessage("La cédula es obligatoria")
        .isNumeric().withMessage("La cédula debe contener solo números")
        .isLength({min:10, max:10}).withMessage("La cédula debe contener 10 dígitos"),
    check('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),
    check('rol')
        .exists().withMessage("El rol es necesario ")
        .isIn(['Conductor', 'Paramedico', 'Asistente']).withMessage("roles permitidos ['Conductor, Paramedico, Asistente]"),        
    check('placa').custom(existeAmbulanciaValida),
    check('cedula').custom(usuarioActivo),   
    check('cedula').custom(existeUsuario),
    ExistAuthorAmbulance,
    validarCampos,    
],postAuthorInventory);


export default router;
