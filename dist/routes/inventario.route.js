"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var registro_producto_controller_1 = require("../controllers/registro_producto.controller");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var ambulancia_validators_db_1 = require("../db/ambulancia_validators.db");
var producto_ambulancia_db_1 = require("../db/producto_ambulancia.db");
var router = (0, express_1.Router)();
router.post('', [
    (0, express_validator_1.check)('id_producto')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({ min: 36, max: 36 }).withMessage("El id no es válido"),
    (0, express_validator_1.check)('placa')
        .exists().withMessage("La placa es obligatoria")
        .isAlphanumeric().withMessage("La placa solo puede tener números y letras")
        .isLength({ min: 7, max: 7 }).withMessage("La placa debe tener 7 caracteres entre letras y números"),
    (0, express_validator_1.check)('cant_consumo')
        .exists().withMessage("La cantidad de consumo es obligatoria")
        .isInt({ min: 0 }).withMessage("La cantidad de consumo debe ser mayor o igual a cero"),
    (0, express_validator_1.check)('fecha')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("La fecha debe contar con el formato AA/MM/DD"),
    (0, express_validator_1.check)('placa').custom(ambulancia_validators_db_1.existeAmbulanciaValida),
    (0, express_validator_1.check)('id_producto').custom(producto_ambulancia_db_1.exiteProductoCaducidad),
    validar_campos_1.validarCampos
], registro_producto_controller_1.postRegistroProducto);
exports.default = router;
//# sourceMappingURL=inventario.route.js.map