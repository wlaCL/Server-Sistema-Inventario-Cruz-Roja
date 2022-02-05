"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoria_controller_1 = require("../controllers/categoria.controller");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var categoria_validators_db_1 = require("../db/categoria_validators.db");
var validar_campos_categoria_1 = require("../middlewares/validar_campos_categoria");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_rol_1 = require("../middlewares/validar_rol");
var router = (0, express_1.Router)();
//Obtener todas las categorias 
router.get('/busqueda', [
    validar_jwt_middleware_1.validarJWT,
    validar_campos_1.validarCampos,
], categoria_controller_1.getCategorias);
//Buscar categoria por nombre
router.get('/:nombre', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('nombre')
        .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"),
    validar_campos_1.validarCampos
], categoria_controller_1.getCategoria);
//crear categoria
router.post('', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('nombre')
        .exists().withMessage("El nombre es obligatorio")
        .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"),
    (0, express_validator_1.check)('nombre').custom(categoria_validators_db_1.existeCategoriaNombre),
    validar_campos_1.validarCampos
], categoria_controller_1.postCategoria);
//Eliminar categoria
router.delete('/:id', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido"),
    (0, express_validator_1.check)('id').custom(categoria_validators_db_1.existeCategoriaID),
    validar_campos_1.validarCampos
], categoria_controller_1.deleteCategoria);
//actualizar categoria
router.put('/:id', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido")
        .isLength({ min: 36, max: 36 }).withMessage("El id no es válido"),
    (0, express_validator_1.check)('nombre')
        .optional({ nullable: true })
        .isLength({ min: 3 }).withMessage("El nombre debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    (0, express_validator_1.check)('id').custom(categoria_validators_db_1.existeCategoriaID),
    (0, express_validator_1.check)('nombre').custom(categoria_validators_db_1.existeCategoriaNombre),
    validar_campos_1.validarCampos,
    validar_campos_categoria_1.CamposValidosBody
], categoria_controller_1.putCategoria);
exports.default = router;
//# sourceMappingURL=categoria.route.js.map