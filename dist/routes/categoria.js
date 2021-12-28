"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoria_1 = require("../controllers/categoria");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var db_categoria_validators_1 = require("../db/db_categoria_validators");
var validar_campos_categoria_1 = require("../middlewares/validar_campos_categoria");
var router = (0, express_1.Router)();
//Obtener todas las categorias 
router.get('', categoria_1.getCategorias);
//Buscar categoria por nombre
router.get('/:nombre', [
    (0, express_validator_1.check)('nombre')
        .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"),
    validar_campos_1.validarCampos
], categoria_1.getCategoria);
//crear categoria
router.post('', [
    (0, express_validator_1.check)('nombre')
        .exists().withMessage("El nombre es obligatorio")
        .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"),
    (0, express_validator_1.check)('nombre').custom(db_categoria_validators_1.existeCategoriaNombre),
    validar_campos_1.validarCampos
], categoria_1.postCategoria);
//Eliminar categoria
router.delete('/:id', [
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido"),
    (0, express_validator_1.check)('id').custom(db_categoria_validators_1.existeCategoriaID),
    validar_campos_1.validarCampos
], categoria_1.deleteCategoria);
//actualizar categoria
router.put('/:id', [
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido")
        .isLength({ min: 36, max: 36 }).withMessage("El id no es válido"),
    (0, express_validator_1.check)('id').custom(db_categoria_validators_1.existeCategoriaID),
    validar_campos_1.validarCampos,
    validar_campos_categoria_1.CamposValidosBody
], categoria_1.putCategoria);
exports.default = router;
//# sourceMappingURL=categoria.js.map