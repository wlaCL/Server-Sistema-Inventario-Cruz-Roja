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
exports.obtenerAmbulancias = exports.obtenerAmbulancia = exports.actualizarAmbulancia = exports.eliminarAmbulancia = exports.postAmbulancia = void 0;
var sequelize_1 = require("sequelize");
var models_1 = require("../models/models");
var error_1 = __importDefault(require("../models/errors/error"));
//crear ambulancia
var postAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, placa, num_vehiculo, descripcion, ambulancia, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, placa = _a.placa, num_vehiculo = _a.num_vehiculo, descripcion = _a.descripcion;
                return [4 /*yield*/, models_1.Ambulancia.create({
                        placa: placa,
                        num_vehiculo: num_vehiculo,
                        descripcion: descripcion,
                    })];
            case 1:
                ambulancia = _b.sent();
                if (ambulancia) {
                    return [2 /*return*/, res.status(400).json({
                            ok: true,
                            msg: "Ambulancia registrada exitósamente",
                            ambulancia: ambulancia
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postAmbulancia = postAmbulancia;
//Eliminar ambulancia medinante placa
var eliminarAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var placa, ambulancia, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                placa = req.params.placa;
                return [4 /*yield*/, models_1.Ambulancia.update({ estado: false }, {
                        where: {
                            placa: placa,
                            estado: true
                        }
                    })];
            case 1:
                ambulancia = _a.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Eliminación exitósa",
                    ambulancia: ambulancia
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.eliminarAmbulancia = eliminarAmbulancia;
// actulizar ambulancia 
var actualizarAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var placa, _a, _b, descripcion, _c, num_vehiculo, amb, ambulancia, error_4;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                placa = req.params.placa;
                _a = req.body, _b = _a.descripcion, descripcion = _b === void 0 ? "" : _b, _c = _a.num_vehiculo, num_vehiculo = _c === void 0 ? "" : _c;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Ambulancia.findByPk(placa)];
            case 2:
                amb = _d.sent();
                return [4 /*yield*/, models_1.Ambulancia.update({
                        descripcion: (descripcion != "") ? descripcion : amb.descripcion,
                        num_vehiculo: (num_vehiculo != "") ? num_vehiculo : amb.num_vehiculo,
                    }, {
                        where: {
                            placa: placa
                        }
                    })];
            case 3:
                ambulancia = _d.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Actualización de datos de ambulancia",
                    ambulancia: ambulancia
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _d.sent();
                console.log(error_4);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con administrador"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.actualizarAmbulancia = actualizarAmbulancia;
//Busqueda de ambulancia
var obtenerAmbulancia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var termino, ambulancia, obj, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                termino = req.params.termino;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Ambulancia.findOne({
                        where: (_a = {},
                            _a[sequelize_1.Op.and] = (_b = {},
                                _b[sequelize_1.Op.or] = {
                                    placa: termino,
                                    num_vehiculo: termino,
                                },
                                _b),
                            _a.estado = true,
                            _a),
                        attributes: { exclude: ['estado'] }
                    })];
            case 2:
                ambulancia = _c.sent();
                if (!ambulancia) {
                    obj = new error_1.default(termino, "No existen registros");
                    return [2 /*return*/, res.status(404).json({
                            errors: obj.ErrorObjt
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Búsqueda éxitosa",
                    ambulancia: ambulancia
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.log(error_5);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.obtenerAmbulancia = obtenerAmbulancia;
var obtenerAmbulancias = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var ambulancias, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Ambulancia.findAll({
                        where: {
                            estado: true
                        }
                    })];
            case 1:
                ambulancias = _a.sent();
                console.log(ambulancias);
                if (ambulancias.length == 0) {
                    return [2 /*return*/, resp.status(400).json({
                            ok: false,
                            msg: "No se han econtrado resultados",
                            ambulancias: []
                        })];
                }
                resp.status(200).json({
                    ok: true,
                    msg: "Resultados encontrados",
                    ambulancias: ambulancias
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                resp.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerAmbulancias = obtenerAmbulancias;
//# sourceMappingURL=ambulancia.controller.js.map