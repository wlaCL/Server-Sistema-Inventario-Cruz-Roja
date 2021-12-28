"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_1 = require("../controllers/usuario");
var router = (0, express_1.Router)();
router.post('', usuario_1.postUsuario);
//# sourceMappingURL=usuarios.js.map