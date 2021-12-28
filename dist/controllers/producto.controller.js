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
exports.deleteProductoAmbulancia = exports.putProductoAmbulancia = exports.postProductoAmbulancia = exports.deleteProductoCaducidad = exports.putProductoCaducidad = exports.postProductoCaducidad = exports.getProductos = exports.getProducto = exports.deleteProducto = exports.putProducto = exports.postProducto = void 0;
var sequelize_1 = require("sequelize");
var producto_associations_1 = require("../associations/producto.associations");
var error_1 = __importDefault(require("../models/errors/error"));
// TIPO DE PRODUCTO
//crear producto
var postProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_categoria, nombre, _b, descripcion, can_minima, tipo, _c, medida, producto, _d, error_2, name_1, errors, obj;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, id_categoria = _a.id_categoria, nombre = _a.nombre, _b = _a.descripcion, descripcion = _b === void 0 ? "" : _b, can_minima = _a.can_minima, tipo = _a.tipo, _c = _a.medida, medida = _c === void 0 ? "" : _c;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, , 10]);
                return [4 /*yield*/, producto_associations_1.TProducto.create({
                        id_categoria: id_categoria,
                        nombre: nombre,
                        descripcion: descripcion,
                        can_minima: can_minima,
                        tipo: tipo
                    })];
            case 2:
                producto = _e.sent();
                _d = medida;
                switch (_d) {
                    case "unidad": return [3 /*break*/, 3];
                    case "caja": return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, producto_associations_1.Unidad_Medida.create({
                    id_tipoprod: producto.id_tipoprod,
                    unidad: true
                })];
            case 4:
                _e.sent();
                producto.dataValues.medida = "unidad";
                return [3 /*break*/, 8];
            case 5: return [4 /*yield*/, producto_associations_1.Unidad_Medida.create({
                    id_tipoprod: producto.id_tipoprod,
                    caja: true
                })];
            case 6:
                _e.sent();
                producto.dataValues.medida = "caja";
                console.log("soye el producto", producto);
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8: return [2 /*return*/, res.status(201).json({
                    ok: true,
                    msg: "Registro de producto exitoso",
                    producto: producto
                })];
            case 9:
                error_2 = _e.sent();
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
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.postProducto = postProducto;
//actualizar producto
var putProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, _b, _c, nombre, _d, descripcion, _e, can_minima, _f, tipo, tipo_producto, producto, obj, error_3, name_2, errors, obj;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b = req.body, _c = _b.nombre, nombre = _c === void 0 ? "" : _c, _d = _b.descripcion, descripcion = _d === void 0 ? "" : _d, _e = _b.can_minima, can_minima = _e === void 0 ? "" : _e, _f = _b.tipo, tipo = _f === void 0 ? "" : _f;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 4, , 5]);
                return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 2:
                tipo_producto = _g.sent();
                return [4 /*yield*/, producto_associations_1.TProducto.update({
                        nombre: (nombre != "") ? nombre : tipo_producto.nombre,
                        descripcion: (descripcion != "") ? descripcion : tipo_producto.descripcion,
                        can_minima: (can_minima != "") ? can_minima : tipo_producto.can_minima,
                        tipo: (tipo != "") ? tipo : tipo_producto.tipo
                    }, {
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 3:
                producto = _g.sent();
                if (producto[0] == 0) {
                    obj = new error_1.default('', 'No se registraron cambios');
                    return [2 /*return*/, res.status(400).json({
                            errors: obj.ErrorObj
                        })];
                }
                res.status(201).json({
                    ok: true,
                    msg: "Actualización de producto exitoso",
                    producto: producto
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _g.sent();
                console.log(error_3);
                name_2 = error_3.name, errors = error_3.errors;
                if (name_2 === "SequelizeValidationError") {
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
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.putProducto = putProducto;
//eliminar producto 
var deleteProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, producto, obj, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                console.log(id);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.TProducto.update({
                        estado: false
                    }, {
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 2:
                producto = _b.sent();
                if (producto[0] == 0) {
                    obj = new error_1.default('id', "No se encontraron registros");
                    return [2 /*return*/, res.status(404).json({
                            errors: obj.ErrorObj
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Eliminacion exitosa",
                    producto: producto
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({
                    errors: "Ha ocurrido un error contactate con el administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProducto = deleteProducto;
//obtener producto 
var getProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, producto, obj, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 1:
                producto = _b.sent();
                if (!producto) {
                    obj = new error_1.default('id', "No se encontraron registros");
                    return [2 /*return*/, res.status(404).json({
                            errors: obj.ErrorObj
                        })];
                }
                res.status(200).json({
                    msg: "Búsqueda exitosa",
                    producto: producto
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.log(error_5);
                res.status(500).json({
                    msg: "Ha ocurrido un error contácte con el administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProducto = getProducto;
//consultar productos  POR VERIFICAR
var getProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var termino, _a, rows, count, error_6;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                termino = req.params.termino;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.TProducto.findAndCountAll({
                        where: {
                            nombre: (_b = {},
                                _b[sequelize_1.Op.or] = (_c = {},
                                    _c[sequelize_1.Op.startsWith] = termino,
                                    _c[sequelize_1.Op.endsWith] = termino,
                                    _c[sequelize_1.Op.substring] = termino,
                                    _c),
                                _b)
                        }
                    })];
            case 2:
                _a = _d.sent(), rows = _a.rows, count = _a.count;
                console.log(rows, count);
                if (rows == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se encontraron registros"
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Búsqueda éxitosa",
                    productos: rows,
                    registros: count
                });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _d.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductos = getProductos;
// PRODUCTOS CON FECHA DE CADUCIDAD
var postProductoCaducidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_tipoprod, fecha_caducidad, cantidad, producto, error_7, name_3, errors, obj;
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
                error_7 = _b.sent();
                console.log(error_7);
                name_3 = error_7.name, errors = error_7.errors;
                if (name_3 === "SequelizeValidationError") {
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
    var _a, id, _b, cantidad, busqueda, producto, obj;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, id = _a.id, _b = _a.cantidad, cantidad = _b === void 0 ? "" : _b;
                return [4 /*yield*/, producto_associations_1.Producto.findOne({
                        where: {
                            producto: id
                        }
                    })];
            case 1:
                busqueda = _c.sent();
                return [4 /*yield*/, producto_associations_1.Producto.update({
                        cantidad: (cantidad != "") ? cantidad : cantidad
                    }, {
                        where: { id_producto: id }
                    })];
            case 2:
                producto = _c.sent();
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
                return [2 /*return*/];
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
//PRODUCTOS ASIGNADOS A AMBULANCIAS
var postProductoAmbulancia = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.postProductoAmbulancia = postProductoAmbulancia;
var putProductoAmbulancia = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.putProductoAmbulancia = putProductoAmbulancia;
var deleteProductoAmbulancia = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.deleteProductoAmbulancia = deleteProductoAmbulancia;
//# sourceMappingURL=producto.controller.js.map