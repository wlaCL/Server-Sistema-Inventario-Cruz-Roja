"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var ambulancia_validators_db_1 = require("../db/ambulancia_validators.db");
var reporte_controller_1 = require("../controllers/reporte.controller");
var validar_campos_1 = require("../middlewares/validar_campos");
var validar_campos_reporte_1 = require("../middlewares/validar_campos_reporte");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_rol_1 = require("../middlewares/validar_rol");
var create_report_controller_1 = require("../controllers/create_report.controller");
var reporte_validators_db_1 = require("../db/reporte_validators.db");
var router = (0, express_1.Router)();
router.post('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    (0, express_validator_1.check)('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    validar_campos_reporte_1.ExistAuthorAmbulance,
    validar_campos_1.validarCampos,
], reporte_controller_1.postReporte);
router.put('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({ min: 36, max: 36 }).withMessage("El id no es válido"),
    (0, express_validator_1.check)('novedades')
        .optional({ nullable: true }),
    (0, express_validator_1.check)('base')
        .exists().withMessage("La base es obligatoria")
        .isLength({ min: 3 }).withMessage("La base debe tener mínimo tres letras"),
    (0, express_validator_1.check)('conductor')
        .optional({ nullable: true })
        .matches(/^[A-Za-z\s]+$/).withMessage('El conductor solo de contener letras'),
    (0, express_validator_1.check)('asistente')
        .optional({ nullable: true })
        .matches(/^[A-Za-z\s]+$/).withMessage('El asistente solo de contener letras'),
    validar_campos_1.validarCampos,
], reporte_controller_1.putReporte);
router.post('/exist', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    (0, express_validator_1.check)('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AAAA/MM/DD"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    validar_campos_1.validarCampos
], reporte_controller_1.getReporte);
router.get('/search/pdf/:id', [
    validar_jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("Identificador no válido")
        .isLength({ min: 36, max: 36 }).withMessage("Identificador no válido"),
    (0, express_validator_1.check)('id').custom(reporte_validators_db_1.existReport),
    (0, express_validator_1.check)('id').custom(reporte_validators_db_1.existReportFinish),
    validar_campos_1.validarCampos
], create_report_controller_1.createReportPDF);
router.get('/search/data/report', [
    //validarJWT,
    (0, express_validator_1.query)('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe tener el formato AAAA/MM/DD"),
    (0, express_validator_1.query)('placa')
        .exists().withMessage('La placa es obligatoria')
        .isAlphanumeric().withMessage("La placa solo debe contener números y letras")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 dígitos"),
    validar_campos_1.validarCampos
], reporte_controller_1.searchReport);
exports.default = router;
//# sourceMappingURL=reporte.route.js.map