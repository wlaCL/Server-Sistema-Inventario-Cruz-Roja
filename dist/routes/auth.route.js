"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var auth_controller_1 = require("../controllers/auth.controller");
var validar_campos_1 = require("../middlewares/validar_campos");
var router = (0, express_1.Router)();
router.post('/app', [
    (0, express_validator_1.body)("cedula")
        .exists().withMessage("La cedula es obligatoria")
        .isNumeric().withMessage("Cédula no válida"),
    (0, express_validator_1.body)("password")
        .exists().withMessage("La contraseña es obligatoria"),
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
exports.default = router;
//# sourceMappingURL=auth.route.js.map