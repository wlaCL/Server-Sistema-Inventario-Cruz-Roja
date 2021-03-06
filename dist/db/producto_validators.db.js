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
exports.permiteProductoCaducidad = exports.existeProductoCaducidadID = exports.existeProductoFechaCaducidad = exports.ExisteTipoProductoID = exports.ExisteProductoNombre = void 0;
var producto_associations_1 = require("../associations/producto.associations");
var ExisteProductoNombre = function (nombre) {
    if (nombre === void 0) { nombre = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var producto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            nombre: nombre,
                            estado: true
                        }
                    })];
                case 1:
                    producto = _a.sent();
                    if (producto) {
                        throw new Error("Ya existe un producto registrado con el nombre " + nombre);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.ExisteProductoNombre = ExisteProductoNombre;
var ExisteTipoProductoID = function (id) {
    if (id === void 0) { id = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var producto, categoria;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            id_tipoprod: id,
                            estado: true
                        }
                    })];
                case 1:
                    producto = _a.sent();
                    if (!producto) {
                        throw new Error("El producto no se encuetra registrado");
                    }
                    return [4 /*yield*/, producto_associations_1.Categoria.findOne({
                            where: {
                                id_categoria: producto.id_categoria,
                                estado: true
                            }
                        })];
                case 2:
                    categoria = _a.sent();
                    if (!categoria) {
                        throw new Error("El producto no se encuetra registrado");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.ExisteTipoProductoID = ExisteTipoProductoID;
//PRODUCTOS CON FECHA DE CADUCIDAD
//verifica si el producto que se quiere registrar ya est?? ingresado
var existeProductoFechaCaducidad = function (fecha) {
    if (fecha === void 0) { fecha = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var producto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, producto_associations_1.Producto.findOne({
                        where: {
                            fecha_caducidad: fecha,
                            estado: true
                        }
                    })];
                case 1:
                    producto = _a.sent();
                    if (producto) {
                        throw new Error("El producto ya cuenta con la fecha de caducidad indicada");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.existeProductoFechaCaducidad = existeProductoFechaCaducidad;
var existeProductoCaducidadID = function (id) {
    if (id === void 0) { id = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var producto, tipo_producto, categoria;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, producto_associations_1.Producto.findOne({
                        where: {
                            id_producto: id,
                            estado: true
                        }
                    })];
                case 1:
                    producto = _a.sent();
                    if (!producto) {
                        throw new Error("El producto no se encuentra registrado");
                    }
                    return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                            where: {
                                id_tipoprod: producto.id_tipoprod,
                                estado: true
                            }
                        })];
                case 2:
                    tipo_producto = _a.sent();
                    if (!tipo_producto) {
                        throw new Error(" El producto no se encuentra registro");
                    }
                    return [4 /*yield*/, producto_associations_1.Categoria.findOne({
                            where: {
                                id_categoria: tipo_producto.id_categoria,
                                estado: true
                            }
                        })];
                case 3:
                    categoria = _a.sent();
                    if (!categoria) {
                        throw new Error("El producto no se encuetra registrado");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.existeProductoCaducidadID = existeProductoCaducidadID;
var permiteProductoCaducidad = function (id) {
    if (id === void 0) { id = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var producto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            id_tipoprod: id,
                            estado: true,
                            tipo: "Equipo"
                        }
                    })];
                case 1:
                    producto = _a.sent();
                    if (producto) {
                        throw new Error("El producto no permite asignar fecha de caducidad tipo de producto: " + producto.tipo);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.permiteProductoCaducidad = permiteProductoCaducidad;
//# sourceMappingURL=producto_validators.db.js.map