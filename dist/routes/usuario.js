"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var usuario_1 = require("../controllers/usuario");
var validar_campos_usuario_1 = require("../middlewares/validar_campos_usuario");
var validar_campos_1 = require("../middlewares/validar_campos");
var db_usuario_validators_1 = require("../db/db_usuario_validators");
var router = (0, express_1.Router)();
//crear usuario
router.post('', [
    (0, express_validator_1.check)('cedula')
        .exists().withMessage('El cedula es obligatoria')
        .isNumeric().withMessage('La cédula debe contener solo numeros')
        .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener 10 dígitos'),
    (0, express_validator_1.check)('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    (0, express_validator_1.check)('apellido')
        .exists().withMessage("El apellido es obligatorio")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.noExistePersona),
    validar_campos_1.validarCampos,
    validar_campos_usuario_1.rolValido,
    validar_campos_usuario_1.contrasenaValida,
], usuario_1.postUsuario);
// eliminar usuario
router.delete('/:cedula', [
    (0, express_validator_1.check)('cedula')
        .exists().withMessage('La cedula es obligatoria'),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.existeUsuario),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.usuarioActivo),
    validar_campos_1.validarCampos,
], usuario_1.deleteUsuario);
//actualizar datos de usuario 
router.put('/:cedula', [
    (0, express_validator_1.check)('cedula')
        .exists().withMessage("La cédula es obligatoria")
        .isNumeric().withMessage("La cédula debe contener solo números")
        .isLength({ min: 10, max: 10 }).withMessage("La cédula debe contener 10 dígitos"),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.usuarioActivo),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.existeUsuario),
    validar_campos_1.validarCampos,
    validar_campos_usuario_1.AlmenosUnCampo,
    validar_campos_usuario_1.rolValido,
    //tamanoContrasena 
], usuario_1.actualizarUsuario);
//Obtener dartos del usurario
router.get('/:cedula', [
    (0, express_validator_1.check)('cedula')
        .exists().withMessage("La cédula es obligatoria"),
    (0, express_validator_1.check)('cedula')
        .isNumeric().withMessage("La cédula debe contener solo números"),
    (0, express_validator_1.check)('cedula')
        .isLength({ min: 10, max: 10 }).withMessage("La cédula debe contener 10 dígitos"),
    (0, express_validator_1.check)('cedula').custom(db_usuario_validators_1.existeUsuario),
    validar_campos_1.validarCampos
], usuario_1.getUsuario);
//buscar usuario 
//modificar contraseña
exports.default = router;
//# sourceMappingURL=usuario.js.map