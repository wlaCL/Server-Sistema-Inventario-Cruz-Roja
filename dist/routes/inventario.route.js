"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var registro_producto_controller_1 = require("../controllers/registro_producto.controller");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var validar_rol_1 = require("../middlewares/validar_rol");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_campos_reporte_1 = require("../middlewares/validar_campos_reporte");
var router = (0, express_1.Router)();
router.post('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserApp,
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id del producto es obligatorio")
        .isUUID(4).withMessage("El id no es válido")
        .isLength({ min: 36, max: 36 }).withMessage("El id no es válido"),
    (0, express_validator_1.check)('cant_consumo')
        .exists().withMessage("La cantidad de consumo es obligatoria")
        .isInt({ min: 0 }).withMessage("La cantidad de consumo debe ser mayor o igual a cero"),
    (0, express_validator_1.check)('id_reporte')
        .exists().withMessage("El id del reporte es obligatorio")
        .isUUID(4).withMessage("Identificador no válido")
        .isLength({ min: 36, max: 36 }).withMessage("Idetificador no válido"),
    (0, express_validator_1.check)('carga')
        .optional({ nullable: true })
        .isInt({ min: 1 }).withMessage("El valor mínimo de la carga es 1"),
    validar_campos_1.validarCampos,
    validar_campos_reporte_1.existeRegistro
], registro_producto_controller_1.postRegistroProducto);
//obtencion de datos de productos por nombre
exports.default = router;
//# sourceMappingURL=inventario.route.js.map