"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_1 = require("../controllers/producto");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var db_categoria_validators_1 = require("../db/db_categoria_validators");
var db_producto_validators_1 = require("../db/db_producto_validators");
var router = (0, express_1.Router)();
router.post('', [
    (0, express_validator_1.check)('id_categoria')
        .exists().withMessage("El id_categoria es obligatorio")
        .isUUID(4).withMessage("No es un id_válido"),
    (0, express_validator_1.check)('nombre')
        .exists().withMessage("El nombre es obligatorio")
        .matches(/^[A-Za-z\s]+$/).withMessage("No es un nombre válido"),
    (0, express_validator_1.check)('tipo')
        .exists().withMessage("El tipo de producto es obligatorio")
        .isIn(['Insumo Medico', 'Equipo']).withMessage("El tipo de producto no es válido ['Insumo Medico', 'Equipo']"),
    (0, express_validator_1.check)('can_minima')
        .exists().withMessage("La cantidad Minima es obligatoria")
        .isNumeric().withMessage("La cantidad debe ser un número"),
    (0, express_validator_1.check)('id_categoria').custom(db_categoria_validators_1.existeCategoriaID),
    (0, express_validator_1.check)('nombre').custom(db_producto_validators_1.ExisteProductoNombre),
    validar_campos_1.validarCampos
], producto_1.postProducto);
router.put(':/id', [
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("No es un id válido"),
    (0, express_validator_1.check)('id').custom(db_producto_validators_1.ExisteProductoID),
    validar_campos_1.validarCampos
], producto_1.putProducto);
router.get('/:id', [
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("El id no es valido"),
    validar_campos_1.validarCampos
], producto_1.getProducto);
//router.get('', getProducto) */
//eliminar producto
router.delete('/:id', [
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("El id no es valido"),
    validar_campos_1.validarCampos
], producto_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto.js.map