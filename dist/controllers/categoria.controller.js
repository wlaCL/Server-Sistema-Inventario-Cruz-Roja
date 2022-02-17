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
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.getCategoria = exports.getCategoriasWeb = exports.getCategorias = void 0;
var sequelize_1 = require("sequelize");
var producto_associations_1 = require("../associations/producto.associations");
var getCategorias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, inicio, _c, fin, categorias, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a.inicio, inicio = _b === void 0 ? 0 : _b, _c = _a.fin, fin = _c === void 0 ? 3 : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Categoria.findAndCountAll({
                        attributes: { exclude: ['estado'] },
                        where: {
                            estado: true,
                        },
                        limit: Number(fin),
                        offset: Number(inicio)
                    })];
            case 2:
                categorias = _d.sent();
                if (!categorias) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se han encontrado registros"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        msg: 'Resultados exitosos',
                        categorias: categorias.rows,
                        registros: categorias.count,
                    })];
            case 3:
                error_1 = _d.sent();
                console.log(error_1);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategorias = getCategorias;
var getCategoriasWeb = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, inicio, _c, fin, categorias, error_2;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, _b = _a.inicio, inicio = _b === void 0 ? 0 : _b, _c = _a.fin, fin = _c === void 0 ? 3 : _c;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Categoria.findAndCountAll({
                        attributes: { exclude: ['estado'] },
                        where: {
                            estado: true,
                            nombre: (_d = {},
                                _d[sequelize_1.Op.not] = 'Varios',
                                _d)
                        },
                        limit: Number(fin),
                        offset: Number(inicio)
                    })];
            case 2:
                categorias = _e.sent();
                if (!categorias) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No se han encontrado registros"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        msg: 'Resultados exitosos',
                        categorias: categorias.rows,
                        registros: categorias.count,
                    })];
            case 3:
                error_2 = _e.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategoriasWeb = getCategoriasWeb;
//buscar una categoria 
var getCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre, _a, _b, inicio, _c, fin, _d, rows, count, error_3;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                nombre = req.params.nombre;
                _a = req.query, _b = _a.inicio, inicio = _b === void 0 ? 0 : _b, _c = _a.fin, fin = _c === void 0 ? 3 : _c;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Categoria.findAndCountAll({
                        where: {
                            nombre: (_e = {},
                                _e[sequelize_1.Op.or] = (_f = {},
                                    _f[sequelize_1.Op.startsWith] = nombre,
                                    _f[sequelize_1.Op.endsWith] = nombre,
                                    _f[sequelize_1.Op.substring] = nombre,
                                    _f),
                                _e),
                            estado: true,
                        },
                        limit: Number(fin),
                        offset: Number(inicio)
                    })];
            case 2:
                _d = _g.sent(), rows = _d.rows, count = _d.count;
                if (rows.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No existen registros"
                        })];
                }
                res.status(200).json({
                    msg: 'Búsqueda éxitosa',
                    categorias: rows,
                    registros: count
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _g.sent();
                console.log(error_3);
                res.status(500).json({
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategoria = getCategoria;
var postCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, descripcion, categoria, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nombre = _a.nombre, descripcion = _a.descripcion;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Categoria.create({
                        nombre: nombre,
                        descripcion: descripcion
                    })];
            case 2:
                categoria = _b.sent();
                res.status(201).json({
                    ok: true,
                    msg: "Categoría de creada exitósamente",
                    categoria: categoria
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postCategoria = postCategoria;
//se necesita recibir los parametros
var putCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, _b, _c, nombre, _d, descripcion, categoria, error_5;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b = req.body, _c = _b.nombre, nombre = _c === void 0 ? "" : _c, _d = _b.descripcion, descripcion = _d === void 0 ? "" : _d;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 4, , 5]);
                return [4 /*yield*/, producto_associations_1.Categoria.findOne({
                        where: {
                            id_categoria: id,
                            estado: true
                        }
                    })];
            case 2:
                categoria = _e.sent();
                return [4 /*yield*/, producto_associations_1.Categoria.update({
                        nombre: (nombre != "") ? nombre : categoria.nombre,
                        descripcion: (descripcion != "") ? descripcion : categoria.descripcion
                    }, {
                        where: { id_categoria: id }
                    })];
            case 3:
                _e.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Actualizacion exitosa",
                    categoria: categoria
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _e.sent();
                console.log(error_5);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.putCategoria = putCategoria;
//falta un estado para la eliminacipon 
var deleteCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, categoria, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, producto_associations_1.Categoria.update({
                        estado: false,
                    }, {
                        where: { id_categoria: id }
                    })];
            case 2:
                categoria = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        msg: "Eliminación exitosa",
                        categoria: categoria
                    })];
            case 3:
                error_6 = _b.sent();
                console.log(error_6);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoria.controller.js.map