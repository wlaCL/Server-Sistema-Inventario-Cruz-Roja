import {Router} from "express";
import { check, query} from "express-validator";
import { existeAmbulanciaValida } from '../db/ambulancia_validators.db';
import { postReporte, getReporte, putReporte, searchReport } from '../controllers/reporte.controller';
import { validarCampos } from '../middlewares/validar_campos';
import { ExistAuthorAmbulance } from '../middlewares/validar_campos_reporte';
import { validarJWT } from '../middlewares/validar_jwt.middleware';
import { isUserApp } from "../middlewares/validar_rol";
import { createReportPDF } from '../controllers/create_report.controller';
import { existReport, existReportFinish } from '../db/reporte_validators.db';
const router = Router(); 


router.post('',[
    validarJWT, 
    isUserApp,
    check('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({min: 7, max: 7}).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    check('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),       
    check('placa').custom(existeAmbulanciaValida), 
    ExistAuthorAmbulance,
    validarCampos,    
],postReporte);


router.put('',[    
    validarJWT,
    isUserApp,
    check('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({min:36, max:36}).withMessage("El id no es válido"),
    check('novedades')
        .optional({nullable:true}),
    check('base')
        .exists().withMessage("La base es obligatoria")
        .isLength({min:3}).withMessage("La base debe tener mínimo tres letras"),
    check('conductor')
        .optional({nullable:true})
        .matches(/^[A-Za-z\s]+$/).withMessage('El conductor solo de contener letras'),
    check('asistente')
        .optional({nullable:true})
        .matches(/^[A-Za-z\s]+$/).withMessage('El asistente solo de contener letras'),         
    validarCampos,    
],putReporte);

router.post('/exist',[
    validarJWT, 
    isUserApp,
    check('placa')
    .exists().withMessage("La placa es obligatoria")
    .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
    .isLength({min: 7, max: 7}).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    check('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AAAA/MM/DD"),       
    check('placa').custom(existeAmbulanciaValida), 
    validarCampos
], getReporte);


router.get('/search/pdf/:id',[
    //validarJWT,
    check('id')
        .isUUID(4).withMessage("Identificador no válido")
        .isLength({min: 36, max: 36}).withMessage("Identificador no válido"),
    check('id').custom(existReport), 
    check('id').custom(existReportFinish), 
    validarCampos    
], createReportPDF);


router.get('/search/data/report',[
    validarJWT,
    query('fecha')
    .exists().withMessage("La fecha es obligatoria")
    .isDate().withMessage("La fecha debe tener el formato AAAA/MM/DD"),
    query('placa')
    .exists().withMessage('La placa es obligatoria')
    .isAlphanumeric().withMessage("La placa solo debe contener números y letras")
    .isLength({min: 7, max: 7}).withMessage("La placa debe contener 7 dígitos"), 
    validarCampos
],searchReport);

export default router;
