"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var ambulancia_controller_1 = require("../controllers/ambulancia.controller");
var validar_campos_1 = require("../middlewares/validar_campos");
var ambulancia_validators_db_1 = require("../db/ambulancia_validators.db");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_rol_1 = require("../middlewares/validar_rol");
var router = (0, express_1.Router)();
router.post('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres"),
    (0, express_validator_1.check)('num_vehiculo')
        .exists().withMessage("El número de vehículo es obligatorio")
        .isNumeric().withMessage("El número de vehículo solo puede contener números")
        .isInt({ min: 1, }).withMessage("El número de vehículo debe ser positivo")
        .isLength({ min: 1, max: 10 }).withMessage("El número de vehículo no debe sobrepasar los 10 digitos"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.exiteAmbulanciaPlaca),
    (0, express_validator_1.check)('num_vehiculo').custom(ambulancia_validators_db_1.existeAmbulanciaNumVehiculo),
    validar_campos_1.validarCampos
], ambulancia_controller_1.postAmbulancia);
router.delete('/:placa', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    validar_campos_1.validarCampos,
], ambulancia_controller_1.eliminarAmbulancia);
//actualizar datos de ambulancia
router.put('/:placa', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    (0, express_validator_1.check)('num_vehiculo')
        .optional({ nullable: true })
        .isNumeric().withMessage("El número de vehículo solo puede contener números")
        .isInt({ min: 1, }).withMessage("El número de vehículo debe ser positivo"),
    (0, express_validator_1.check)('num_vehiculo').custom(ambulancia_validators_db_1.existeAmbulanciaNumVehiculo),
    validar_campos_1.validarCampos,
    //validarCamposAmbulancia
], ambulancia_controller_1.actualizarAmbulancia);
//obtener datos de ambulancia
router.get('/:termino', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    validar_campos_1.validarCampos,
], ambulancia_controller_1.obtenerAmbulancia);
router.get('', [validar_jwt_middleware_1.validarJWT, validar_campos_1.validarCampos], ambulancia_controller_1.obtenerAmbulancias);
exports.default = router;
//# sourceMappingURL=ambulancia.route.js.map