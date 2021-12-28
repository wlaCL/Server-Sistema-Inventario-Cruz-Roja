"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamposValidosBody = void 0;
var error_1 = __importDefault(require("../models/errors/error"));
var CamposValidosBody = function (req, res, next) {
    var _a = req.body, _b = _a.nombre, nombre = _b === void 0 ? "" : _b, _c = _a.descripcion, descripcion = _c === void 0 ? "" : _c;
    if (nombre === "" && descripcion === "") {
        var obj = new error_1.default('nombre = ?, descripcion = ?', "No existen campos ha actualizar");
        return res.status(400).json({
            errors: obj.ErrorObjt
        });
    }
    next();
};
exports.CamposValidosBody = CamposValidosBody;
//# sourceMappingURL=validar_campos_categoria.js.map