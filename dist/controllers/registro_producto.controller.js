"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegistroProducto = void 0;
var producto_associations_1 = require("../associations/producto.associations");
var inventario_associations_1 = require("../associations/inventario.associations");
var postRegistroProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, id, _c, id_reporte, _d, cant_consumo, _e, carga, producto, registro, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.body, _b = _a.id, id = _b === void 0 ? "" : _b, _c = _a.id_reporte, id_reporte = _c === void 0 ? "" : _c, _d = _a.cant_consumo, cant_consumo = _d === void 0 ? 0 : _d, _e = _a.carga, carga = _e === void 0 ? 0 : _e;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 5, , 6]);
                return [4 /*yield*/, producto_associations_1.Producto_Ambulancia.findOne({
                        where: {
                            id_producambu: id,
                            estado: true
                        }
                    })];
            case 2:
                producto = _f.sent();
                if (!producto) {
                    return [2 /*return*/, res.status(404).json({
                            oK: false,
                            msg: "No se han encontrado registros con los datos ingresados"
                        })];
                }
                if (producto.stock == 0 || producto.stock < cant_consumo) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No existe stock disponible para el registro. Stock disponible: " + producto.stock
                        })];
                }
                return [4 /*yield*/, inventario_associations_1.Registro_Producto.create({
                        id_producambu: producto.id_producambu,
                        cant_consumo: cant_consumo,
                        carga: carga,
                        id_reporte: id_reporte
                    })];
            case 3:
                registro = _f.sent();
                return [4 /*yield*/, producto_associations_1.Producto_Ambulancia.update({
                        stock: producto.stock - cant_consumo + carga
                    }, {
                        where: {
                            id_producambu: producto.id_producambu
                        }
                    })];
            case 4:
                _f.sent();
                console.log("**********************************************************+");
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Registro éxitoso",
                        registro: registro
                    })];
            case 5:
                error_1 = _f.sent();
                console.log(error_1);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postRegistroProducto = postRegistroProducto;
//# sourceMappingURL=registro_producto.controller.js.map