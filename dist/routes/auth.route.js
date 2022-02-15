"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var auth_controller_1 = require("../controllers/auth.controller");
var validar_campos_1 = require("../middlewares/validar_campos");
var validar_jwt_middleware_1 = require("../middlewares/validar_jwt.middleware");
var validar_rol_1 = require("../middlewares/validar_rol");
var router = (0, express_1.Router)();
router.post('/app', [
    (0, express_validator_1.body)("cedula")
        .exists().withMessage("La cedula es obligatoria")
        .isNumeric().withMessage("Cédula no válida"),
    (0, express_validator_1.body)("password")
        .exists().withMessage("La contraseña es obligatoria"),
    (0, express_validator_1.body)('dispositivo')
        .exists().withMessage("El token del dispositivo es obligatorio"),
    validar_campos_1.validarCampos
], auth_controller_1.loginApp);
router.post('/web', [
    (0, express_validator_1.body)("cedula")
        .exists().withMessage("La cedula es obligatoria")
        .isNumeric().withMessage("Cédula no válida"),
    (0, express_validator_1.body)("password")
        .exists().withMessage("La contraseña es obligatoria"),
    validar_campos_1.validarCampos
], auth_controller_1.loginWeb);
router.put('/change/password/user', [
    validar_jwt_middleware_1.validarJWT,
    validar_rol_1.isUserWeb,
    (0, express_validator_1.check)('cedula')
        .exists().withMessage("La cédula es obligatoria")
        .isLength({ min: 10, max: 10 }).withMessage("Cédula no válida")
        .isNumeric().withMessage("Cédula no válida"),
    (0, express_validator_1.check)('contrasena')
        .exists().withMessage("La contraseña es obligatoria"),
    (0, express_validator_1.check)('nuevacontrasena')
        .exists().withMessage("La nueva constraseña es obligatoria")
        .isLength({ min: 10, max: 16 }).withMessage("La nueva contraseña debe tener entre 10 y 16 carácteres"),
    validar_campos_1.validarCampos
], auth_controller_1.changePasswordWeb);
router.put('/change/pwuser', [
    validar_jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('contrasena')
        .exists().withMessage("La contraseña es obligatoria"),
    (0, express_validator_1.check)('nuevacontrasena')
        .exists().withMessage("La nueva constraseña es obligatoria")
        .isLength({ min: 10, max: 16 }).withMessage("La nueva contraseña debe tener entre 10 y 16 carácteres"),
    validar_campos_1.validarCampos
], auth_controller_1.changePasswordUser);
exports.default = router;
//# sourceMappingURL=auth.route.js.map