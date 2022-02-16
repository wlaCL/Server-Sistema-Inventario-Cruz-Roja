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
exports.getProductos = exports.getProductoTodos = exports.deleteProducto = exports.putProducto = exports.postProducto = void 0;
var sequelize_1 = require("sequelize");
var producto_associations_1 = require("../associations/producto.associations");
var error_1 = __importDefault(require("../models/errors/error"));
// TIPO DE PRODUCTO
//crear producto
var postProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_categoria, nombre, _b, descripcion, can_minima, tipo, _c, medida, _d, cantidad, medidaProducto, producto, _e, error_2, name_1, errors, obj;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.body, id_categoria = _a.id_categoria, nombre = _a.nombre, _b = _a.descripcion, descripcion = _b === void 0 ? "" : _b, can_minima = _a.can_minima, tipo = _a.tipo, _c = _a.medida, medida = _c === void 0 ? "" : _c, _d = _a.cantidad, cantidad = _d === void 0 ? "" : _d;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 11, , 12]);
                return [4 /*yield*/, producto_associations_1.TProducto.create({
                        id_categoria: id_categoria,
                        nombre: nombre,
                        descripcion: descripcion,
                        can_minima: can_minima,
                        tipo: tipo
                    })];
            case 2:
                producto = _f.sent();
                if (!(tipo == "Equipo")) return [3 /*break*/, 4];
                return [4 /*yield*/, producto_associations_1.Producto.create({
                        id_tipoprod: producto.id_tipoprod,
                        cantidad: cantidad
                    })];
            case 3:
                _f.sent();
                _f.label = 4;
            case 4:
                if (!(tipo == "Insumo Medico")) return [3 /*break*/, 10];
                _e = medida;
                switch (_e) {
                    case "unidad": return [3 /*break*/, 5];
                    case "caja": return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, producto_associations_1.Unidad_Medida.create({
                    id_tipoprod: producto.id_tipoprod,
                    unidad: true
                })];
            case 6:
                medidaProducto = _f.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, producto_associations_1.Unidad_Medida.create({
                    id_tipoprod: producto.id_tipoprod,
                    caja: true
                })];
            case 8:
                medidaProducto = _f.sent();
                return [3 /*break*/, 10];
            case 9: return [3 /*break*/, 10];
            case 10: return [2 /*return*/, res.status(201).json({
                    ok: true,
                    msg: "Registro de producto exitoso",
                    producto: {
                        producto: producto,
                        medida: medidaProducto,
                    }
                })];
            case 11:
                error_2 = _f.sent();
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
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.postProducto = postProducto;
//actualizar producto
var putProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, _b, _c, nombre, _d, descripcion, _e, can_minima, tipo_producto, producto, obj, error_3, name_2, errors, obj;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b = req.body, _c = _b.nombre, nombre = _c === void 0 ? "" : _c, _d = _b.descripcion, descripcion = _d === void 0 ? "" : _d, _e = _b.can_minima, can_minima = _e === void 0 ? "" : _e;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 4, , 5]);
                return [4 /*yield*/, producto_associations_1.TProducto.findOne({
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 2:
                tipo_producto = _f.sent();
                return [4 /*yield*/, producto_associations_1.TProducto.update({
                        nombre: (nombre != "") ? nombre : tipo_producto.nombre,
                        descripcion: (descripcion != "") ? descripcion : tipo_producto.descripcion,
                        can_minima: (can_minima != "") ? can_minima : tipo_producto.can_minima,
                    }, {
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 3:
                producto = _f.sent();
                if (producto[0] == 0) {
                    obj = new error_1.default('id', 'No se encontraron registros para actualizar');
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
                error_3 = _f.sent();
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
    var _a, id, producto, productos, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, producto_associations_1.TProducto.update({
                        estado: false
                    }, {
                        where: {
                            id_tipoprod: id
                        },
                    })];
            case 2:
                producto = _b.sent();
                if (producto == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se encontraron registros"
                        })];
                }
                return [4 /*yield*/, producto_associations_1.Producto.update({
                        estado: false
                    }, {
                        where: {
                            id_tipoprod: id
                        }
                    })];
            case 3:
                productos = _b.sent();
                if (!productos) {
                    res.status(400).json({
                        ok: false,
                        msg: "No se pudo eliminar el producto"
                    });
                }
                res.status(200).json({
                    ok: true,
                    msg: "Eliminacion exitosa",
                    producto: producto
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({
                    errors: "Ha ocurrido un error contactate con el administrador"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProducto = deleteProducto;
//obtener todos los productos
var getProductoTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultado, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, producto_associations_1.TProducto.findAndCountAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre', 'descripcion'],
                                where: {
                                    estado: true
                                },
                            },
                            {
                                model: producto_associations_1.Producto
                            }
                        ],
                        where: {
                            estado: true
                        }
                    })];
            case 1:
                resultado = _a.sent();
                if (resultado.rows == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se encontraron registros"
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Búsqueda exitosa",
                    productos: resultado.rows,
                    registros: resultado.count
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({
                    msg: "Ha ocurrido un error contácte con el administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductoTodos = getProductoTodos;
//consultar productos por nombre
var getProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var termino, _a, _b, inicio, _c, fin, resultado, error_6;
    var _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                termino = req.params.termino;
                _a = req.query, _b = _a.inicio, inicio = _b === void 0 ? 0 : _b, _c = _a.fin, fin = _c === void 0 ? 3 : _c;
                _k.label = 1;
            case 1:
                _k.trys.push([1, 5, , 6]);
                return [4 /*yield*/, producto_associations_1.TProducto.findAndCountAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre', 'descripcion'],
                                where: {
                                    estado: true
                                }
                            },
                            {
                                model: producto_associations_1.Producto,
                                attributes: ['id_producto', 'fecha_caducidad', 'cantidad'],
                                where: {
                                    estado: true
                                },
                                include: [
                                    {
                                        model: producto_associations_1.Producto_Ambulancia,
                                        where: {
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
                            estado: true
                        },
                        offset: Number(inicio),
                        limit: Number(fin)
                    })];
            case 2:
                resultado = _k.sent();
                if (resultado.rows != 0) {
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            msg: "Búsqueda éxitosa",
                            productos: resultado.rows,
                            registros: resultado.count
                        })];
                }
                return [4 /*yield*/, producto_associations_1.TProducto.findAndCountAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre', 'descripcion'],
                                where: {
                                    estado: true
                                }
                            },
                            {
                                model: producto_associations_1.Producto,
                                attributes: ['id_producto', 'fecha_caducidad', 'cantidad'],
                                where: {
                                    estado: true
                                },
                            }
                        ],
                        where: {
                            nombre: (_f = {},
                                _f[sequelize_1.Op.or] = (_g = {},
                                    _g[sequelize_1.Op.startsWith] = termino,
                                    _g[sequelize_1.Op.endsWith] = termino,
                                    _g[sequelize_1.Op.substring] = termino,
                                    _g),
                                _f),
                            estado: true
                        },
                        offset: Number(inicio),
                        limit: Number(fin)
                    })];
            case 3:
                resultado = _k.sent();
                if (resultado.rows != 0) {
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            msg: "Búsqueda éxitosa",
                            productos: resultado.rows,
                            registros: resultado.count
                        })];
                }
                return [4 /*yield*/, producto_associations_1.TProducto.findAndCountAll({
                        include: [
                            {
                                model: producto_associations_1.Categoria,
                                attributes: ['nombre', 'descripcion'],
                                where: {
                                    estado: true
                                }
                            },
                        ],
                        where: {
                            nombre: (_h = {},
                                _h[sequelize_1.Op.or] = (_j = {},
                                    _j[sequelize_1.Op.startsWith] = termino,
                                    _j[sequelize_1.Op.endsWith] = termino,
                                    _j[sequelize_1.Op.substring] = termino,
                                    _j),
                                _h),
                            estado: true
                        },
                        offset: Number(inicio),
                        limit: Number(fin)
                    })];
            case 4:
                resultado = _k.sent();
                if (resultado.rows == 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se encontraron registros",
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Búsqueda éxitosa",
                    productos: resultado.rows,
                    registros: resultado.count
                });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _k.sent();
                console.log(error_6);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contácte con el administrador",
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getProductos = getProductos;
// PRODUCTOS CON FECHA DE CADUCIDAD
//# sourceMappingURL=producto.controller.js.map