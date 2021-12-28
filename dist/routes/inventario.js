"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var inventario_1 = require("../controllers/inventario");
var router = (0, express_1.Router)();
//registar inventario 
router.post('', inventario_1.postInventario);
exports.default = router;
//# sourceMappingURL=inventario.js.map