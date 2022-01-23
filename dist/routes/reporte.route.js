"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var usuario_validators_db_1 = require("../db/usuario_validators.db");
var ambulancia_validators_db_1 = require("../db/ambulancia_validators.db");
var reporte_controller_1 = require("../controllers/reporte.controller");
var validar_campos_1 = require("../middlewares/validar_campos");
var validar_campos_reporte_1 = require("../middlewares/validar_campos_reporte");
var router = (0, express_1.Router)();
router.post('', [
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    (0, express_validator_1.check)('cedula')
        .exists().withMessage("La cédula es obligatoria")
        .isNumeric().withMessage("La cédula debe contener solo números")
        .isLength({ min: 10, max: 10 }).withMessage("La cédula debe contener 10 dígitos"),
    (0, express_validator_1.check)('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),
    (0, express_validator_1.check)('rol')
        .exists().withMessage("El rol es necesario ")
        .isIn(['Conductor', 'Paramedico', 'Asistente']).withMessage("roles permitidos ['Conductor, Paramedico, Asistente]"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    (0, express_validator_1.check)('cedula').custom(usuario_validators_db_1.usuarioActivo),
    (0, express_validator_1.check)('cedula').custom(usuario_validators_db_1.existeUsuario),
    validar_campos_reporte_1.ExistAuthorAmbulance,
    validar_campos_1.validarCampos,
], reporte_controller_1.postAuthorInventory);
exports.default = router;
//# sourceMappingURL=reporte.route.js.map