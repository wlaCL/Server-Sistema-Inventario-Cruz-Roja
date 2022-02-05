"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamposValidosBody = void 0;
var CamposValidosBody = function (req, res, next) {
    var _a = req.body, _b = _a.nombre, nombre = _b === void 0 ? "" : _b, _c = _a.descripcion, descripcion = _c === void 0 ? "" : _c;
    if (nombre === "" && descripcion === "") {
        return res.status(400).json({
            oK: false,
            msg: "No existen campos para actualizar"
        });
    }
    next();
};
exports.CamposValidosBody = CamposValidosBody;
//# sourceMappingURL=validar_campos_categoria.js.map