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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductoCaducidad = exports.putProductoCaducidad = exports.postProductoCaducidad = void 0;
var producto_associations_1 = require("../associations/producto.associations");
var error_1 = __importDefault(require("../models/errors/error"));
var postProductoCaducidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_tipoprod, fecha_caducidad, cantidad, producto, error_2, name_1, errors, obj;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id_tipoprod = _a.id_tipoprod, fecha_caducidad = _a.fecha_caducidad, cantidad = _a.cantidad;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Producto.create({
                        id_tipoprod: id_tipoprod,
                        fecha_caducidad: fecha_caducidad,
                        cantidad: cantidad
                    })];
            case 2:
                producto = _b.sent();
                res.status(201).json({
                    ok: true,
                    msg: "Producto registrado exitósamente",
                    producto: producto
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                name_1 = error_2.name, errors = error_2.errors;
                if (name_1 === "SequelizeValidationError") {
                    obj = new error_1.default(errors[0].value, errors[0].message);
                    return [2 /*return*/, res.status(422).json({
                            errors: obj.ErrorObjt
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            errors: "Ha ocurrido un error contácte con el administrador"
                        })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postProductoCaducidad = postProductoCaducidad;
var putProductoCaducidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, cantidad, busqueda, producto, obj, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body.cantidad, cantidad = _a === void 0 ? "" : _a;
                console.log(cantidad);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, producto_associations_1.Producto.findOne({
                        where: {
                            id_producto: id
                        }
                    })];
            case 2:
                busqueda = _b.sent();
                return [4 /*yield*/, producto_associations_1.Producto.update({
                        cantidad: (cantidad != "") ? cantidad : busqueda.cantidad
                    }, {
                        where: { id_producto: id }
                    })];
            case 3:
                producto = _b.sent();
                if (producto[0] == 0) {
                    obj = new error_1.default('', 'No se registraron cambios');
                    return [2 /*return*/, res.status(400).json({
                            errors: obj.ErrorObj
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Actualiación exitósa",
                    producto: producto
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.putProductoCaducidad = putProductoCaducidad;
var deleteProductoCaducidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, producto;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, producto_associations_1.Producto.update({
                        disponibilidad: false
                    }, {
                        where: {
                            id_producto: id
                        }
                    })];
            case 1:
                producto = _a.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Eliminación exitósa",
                    producto: producto
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteProductoCaducidad = deleteProductoCaducidad;
//# sourceMappingURL=producto_caducidad.js.map