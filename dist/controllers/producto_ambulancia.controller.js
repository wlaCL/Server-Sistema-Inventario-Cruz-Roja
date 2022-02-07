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
exports.getProductosAmbulanciaID = exports.getProductosAmbulanciaNombre = exports.deleteProductoAmbulancia = exports.postProductoAmbulancia = void 0;
//import Producto_Ambulancia from '../models/producto_ambulancia';
var producto_associations_1 = require("../associations/producto.associations");
var sequelize_1 = require("sequelize");
var postProductoAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cant_ambulancia, id_producto, placa, producto, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cant_ambulancia = _a.cant_ambulancia, id_producto = _a.id_producto, placa = _a.placa;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Producto_Ambulancia.create({
                        cant_ambulancia: cant_ambulancia,
                        id_producto: id_producto,
                        placa: placa,
                        stock: cant_ambulancia
                    })];
            case 2:
                producto = _b.sent();
                if (!producto) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No se ha podido completar el registro",
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Asignación exitósa",
                    producto: producto
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({
                    ok: false,
                    msg: "Se ha producido un error contáctate con el administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postProductoAmbulancia = postProductoAmbulancia;
var deleteProductoAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, id_producto, _c, placa, producto_ambulancia, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, _b = _a.id_producto, id_producto = _b === void 0 ? "" : _b, _c = _a.placa, placa = _c === void 0 ? "" : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Producto_Ambulancia.update({
                        estado: false,
                    }, {
                        where: {
                            id_producto: id_producto,
                            placa: placa,
                            estado: true
                        }
                    })];
            case 2:
                producto_ambulancia = _d.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Eliminación exitósa",
                    producto_ambulancia: producto_ambulancia
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _d.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProductoAmbulancia = deleteProductoAmbulancia;
var getProductosAmbulanciaNombre = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, placa, _c, termino, data, error_3;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.params, _b = _a.placa, placa = _b === void 0 ? "" : _b, _c = _a.termino, termino = _c === void 0 ? "" : _c;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.TProducto.findAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre'],
                                where: {
                                    estado: true,
                                    nombre: "Varios"
                                }
                            },
                            {
                                model: producto_associations_1.Producto,
                                attributes: ['id_producto', 'fecha_caducidad', 'cantidad', 'estado'],
                                where: {
                                    estado: true
                                },
                                include: [
                                    {
                                        model: producto_associations_1.Producto_Ambulancia,
                                        where: {
                                            placa: placa,
                                            estado: true
                                        }
                                    }
                                ]
                            }
                        ],
                        where: {
                            nombre: (_d = {},
                                _d[sequelize_1.Op.or] = (_e = {},
                                    _e[sequelize_1.Op.startsWith] = termino,
                                    _e[sequelize_1.Op.endsWith] = termino,
                                    _e[sequelize_1.Op.substring] = termino,
                                    _e),
                                _d),
                            estado: true,
                        }
                    })];
            case 2:
                data = _f.sent();
                console.log(data);
                if (data.length == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No hay regisros"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Consulta éxitosa",
                        data: data
                    })];
            case 3:
                error_3 = _f.sent();
                console.log(error_3);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un errror contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.getProductosAmbulanciaNombre = getProductosAmbulanciaNombre;
var getProductosAmbulanciaID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, placa, _c, id, data, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.params, _b = _a.placa, placa = _b === void 0 ? "" : _b, _c = _a.id, id = _c === void 0 ? "" : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.TProducto.findAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre'],
                                where: {
                                    estado: true,
                                }
                            },
                            {
                                model: producto_associations_1.Producto,
                                attributes: ['id_producto', 'fecha_caducidad', 'cantidad', 'estado'],
                                where: {
                                    estado: true
                                },
                                include: [
                                    {
                                        model: producto_associations_1.Producto_Ambulancia,
                                        where: {
                                            placa: placa,
                                            estado: true
                                        }
                                    }
                                ]
                            }
                        ],
                        where: {
                            id_tipoprod: id,
                            estado: true,
                        }
                    })];
            case 2:
                data = _d.sent();
                console.log("me ejecute hasta el final");
                console.log(data);
                if (data.length == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No hay regisros"
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Consulta éxitosa",
                    data: data
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _d.sent();
                console.log(error_4);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un errror contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.getProductosAmbulanciaID = getProductosAmbulanciaID;
//# sourceMappingURL=producto_ambulancia.controller.js.map