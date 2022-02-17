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
exports.existeNombreProductoAmbulancia = exports.existRegisterProductAmbulancia = exports.verifySumCantProductoAmbulancia = exports.verifyCantProductoAmbulancia = exports.existeProductoAmbulancia = void 0;
var producto_ambulancia_1 = __importDefault(require("../models/producto_ambulancia"));
var producto_associations_1 = require("../associations/producto.associations");
var tipo_producto_model_1 = __importDefault(require("../models/tipo_producto.model"));
var existeProductoAmbulancia = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, placa, _c, id_producto, producto;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, _b = _a.placa, placa = _b === void 0 ? "" : _b, _c = _a.id_producto, id_producto = _c === void 0 ? "" : _c;
                return [4 /*yield*/, producto_ambulancia_1.default.findOne({
                        where: {
                            id_producto: id_producto,
                            placa: placa,
                            estado: true
                        }
                    })];
            case 1:
                producto = _d.sent();
                if (producto) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "El produco ya se encuenta asignado a la placa " + placa
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.existeProductoAmbulancia = existeProductoAmbulancia;
//VALIDAMOS QUE EN LA PETICIÓN  LA CANTIDAD INGRESADA POR EL USUARIO NO SEA MAYOR A LA CANTIDAD REGISTRADA EN LA TABLA PRODUCTO 
var verifyCantProductoAmbulancia = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, id_producto, cant_ambulancia, producto;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, _b = _a.id_producto, id_producto = _b === void 0 ? "" : _b, cant_ambulancia = _a.cant_ambulancia;
                return [4 /*yield*/, producto_associations_1.Producto.findOne({
                        where: {
                            id_producto: id_producto
                        }
                    })];
            case 1:
                producto = _c.sent();
                if (producto.cantidad < cant_ambulancia) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "La cantidad no puede ser mayor a la registrada incialmente en el producto"
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.verifyCantProductoAmbulancia = verifyCantProductoAmbulancia;
var verifySumCantProductoAmbulancia = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var suma, _a, _b, id_producto, _c, cant_ambulancia, rows, producto, i, unidad_disponible;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                suma = 0;
                _a = req.body, _b = _a.id_producto, id_producto = _b === void 0 ? "" : _b, _c = _a.cant_ambulancia, cant_ambulancia = _c === void 0 ? "" : _c;
                return [4 /*yield*/, producto_ambulancia_1.default.findAndCountAll({
                        attributes: ['cant_ambulancia'],
                        where: {
                            id_producto: id_producto,
                            estado: true
                        }
                    })];
            case 1:
                rows = (_d.sent()).rows;
                return [4 /*yield*/, producto_associations_1.Producto.findByPk(id_producto)];
            case 2:
                producto = _d.sent();
                if (rows.length > 0) {
                    //console.log("soy los productos: ", rows[0].dataValues.cant_ambulancia);
                    for (i in rows) {
                        suma = suma + rows[i].dataValues.cant_ambulancia;
                    }
                }
                unidad_disponible = producto.cantidad - suma;
                if (unidad_disponible == 0) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No existe stock disponible"
                        })];
                }
                if (cant_ambulancia > unidad_disponible) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Stock disponible " + unidad_disponible
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.verifySumCantProductoAmbulancia = verifySumCantProductoAmbulancia;
var existRegisterProductAmbulancia = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, placa, _c, id_producto, producto;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, _b = _a.placa, placa = _b === void 0 ? "" : _b, _c = _a.id_producto, id_producto = _c === void 0 ? "" : _c;
                return [4 /*yield*/, producto_ambulancia_1.default.findOne({
                        where: {
                            id_producto: id_producto,
                            placa: placa,
                            estado: true
                        }
                    })];
            case 1:
                producto = _d.sent();
                if (!producto) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "Producto no encontrado"
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.existRegisterProductAmbulancia = existRegisterProductAmbulancia;
var existeNombreProductoAmbulancia = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, id, _c, nombre, _d, placa, producto;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, _b = _a.id, id = _b === void 0 ? "" : _b, _c = _a.nombre, nombre = _c === void 0 ? "" : _c, _d = _a.placa, placa = _d === void 0 ? "" : _d;
                return [4 /*yield*/, tipo_producto_model_1.default.findOne({
                        include: [
                            {
                                model: producto_associations_1.Producto,
                                where: {
                                    estado: true,
                                },
                                include: [
                                    {
                                        model: producto_ambulancia_1.default,
                                        where: {
                                            estado: true,
                                            placa: placa
                                        }
                                    }
                                ],
                            }
                        ],
                        where: {
                            estado: true,
                            nombre: nombre,
                        }
                    })];
            case 1:
                producto = _e.sent();
                if (producto) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "El producto ya se encuentra registrado con la placa  " + placa,
                            producto: producto
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.existeNombreProductoAmbulancia = existeNombreProductoAmbulancia;
//# sourceMappingURL=validar_campos_producto_ambulancia.js.map