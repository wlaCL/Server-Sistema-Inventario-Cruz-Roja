"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var producto_ambulancia_controller_1 = require("../controllers/producto_ambulancia.controller");
var ambulancia_validators_db_1 = require("../db/ambulancia_validators.db");
var validar_campos_1 = require("../middlewares/validar_campos");
var validar_campos_producto_ambulancia_1 = require("../middlewares/validar_campos_producto_ambulancia");
var producto_ambulancia_db_1 = require("../db/producto_ambulancia.db");
var producto_validators_db_1 = require("../db/producto_validators.db");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_rol_1 = require("../middlewares/validar_rol");
var router = (0, express_1.Router)();
router.post('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('cant_ambulancia')
        .exists().withMessage("la cantidad del producto de ambulancia es obligatorio")
        .isInt({ min: 1 }).withMessage("La cantidad debe ser mayor o igual 1"),
    (0, express_validator_1.check)('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido"),
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    (0, express_validator_1.check)('id_producto').custom(producto_validators_db_1.existeProductoCaducidadID),
    validar_campos_1.validarCampos,
    validar_campos_producto_ambulancia_1.existeProductoAmbulancia,
    validar_campos_producto_ambulancia_1.verifyCantProductoAmbulancia,
    validar_campos_producto_ambulancia_1.verifySumCantProductoAmbulancia
], producto_ambulancia_controller_1.postProductoAmbulancia);
router.delete('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido"),
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    (0, express_validator_1.check)('id_producto').custom(producto_ambulancia_db_1.exiteProductoCaducidad),
    validar_campos_1.validarCampos,
    validar_campos_producto_ambulancia_1.existRegisterProductAmbulancia
], producto_ambulancia_controller_1.deleteProductoAmbulancia);
// unicas para la app movil
router.get('/scan/:id/:placa', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("El id no es valido"),
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.ExisteTipoProductoID),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    validar_campos_1.validarCampos
], producto_ambulancia_controller_1.getProductosAmbulanciaID);
router.get('/search/:termino/:placa', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('termino')
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    (0, express_validator_1.check)('placa')
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe contener 7 caracteres")
        .isAlphanumeric().withMessage("La placa solo puede contener letras y números"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    validar_campos_1.validarCampos
], producto_ambulancia_controller_1.getProductosAmbulanciaNombre);
exports.default = router;
//# sourceMappingURL=producto_ambulancia.route.js.map