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
exports.searchReport = exports.getReporte = exports.putReporte = exports.postReporte = void 0;
var reporte_associations_1 = require("../associations/reporte.associations");
var moment_1 = __importDefault(require("moment"));
var postReporte = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, placa, _c, fecha, cedula, trabaja, reporte, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, _b = _a.placa, placa = _b === void 0 ? "" : _b, _c = _a.fecha, fecha = _c === void 0 ? "" : _c;
                cedula = req.user;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, reporte_associations_1.Trabaja.create({
                        placa: placa,
                        cedula: cedula,
                        fecha_inicio: (0, moment_1.default)(fecha, "YYYY-MM-DD").format(),
                        fecha_fin: (0, moment_1.default)(fecha, "YYYY-MM-DD").format(),
                        rol: "Paramedico"
                    })];
            case 2:
                trabaja = _d.sent();
                if (!trabaja) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No se ha podido registrar el reporte"
                        })];
                }
                console.log("trabaja $trabaja");
                return [4 /*yield*/, reporte_associations_1.Reporte.create({
                        id_trabaja: trabaja.id_trabaja,
                        fecha: (0, moment_1.default)(trabaja.fecha_inicio, "YYYY-MM-DD").format(),
                        placa: trabaja.placa
                    })];
            case 3:
                reporte = _d.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Registro existoso",
                    reporte: reporte
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                console.log(error_1);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un error contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 5];
            case 5:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.postReporte = postReporte;
var putReporte = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, novedades, _c, base, _d, asistente, _e, conductor, _f, id, report, reporte, error_2;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.body, _b = _a.novedades, novedades = _b === void 0 ? "" : _b, _c = _a.base, base = _c === void 0 ? "" : _c, _d = _a.asistente, asistente = _d === void 0 ? "" : _d, _e = _a.conductor, conductor = _e === void 0 ? "" : _e, _f = _a.id, id = _f === void 0 ? "" : _f;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 4, , 5]);
                return [4 /*yield*/, reporte_associations_1.Reporte.findByPk(id)];
            case 2:
                report = _g.sent();
                console.log(report);
                if (report.base != null) {
                    return [2 /*return*/, res.status(401).json({
                            ok: false,
                            msg: "No tienes permisos"
                        })];
                }
                return [4 /*yield*/, reporte_associations_1.Reporte.update({
                        novedades: novedades,
                        base: base,
                        asistente: asistente,
                        conductor: conductor
                    }, { where: {
                            id_reporte: id
                        } })];
            case 3:
                reporte = _g.sent();
                if (!reporte) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No se ha podido finalizar el reporte"
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Reporte finalizado exitosamente",
                    reporte: reporte
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _g.sent();
                console.log(error_2);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un error contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.putReporte = putReporte;
var getReporte = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula, _a, _b, fecha, placa, turno, reporte, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                cedula = req.user;
                _a = req.body, _b = _a.fecha, fecha = _b === void 0 ? "" : _b, placa = _a.placa;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, reporte_associations_1.Trabaja.findOne({
                        where: {
                            cedula: cedula,
                            fecha_inicio: fecha,
                            placa: placa
                        }
                    })];
            case 2:
                turno = _c.sent();
                if (!turno) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "Aun no has registrado el reporte",
                        })];
                }
                return [4 /*yield*/, reporte_associations_1.Reporte.findOne({
                        where: {
                            id_trabaja: turno.id_trabaja
                        }
                    })];
            case 3:
                reporte = _c.sent();
                if (reporte.base == null) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No ha finalizado el reporte",
                            reporte: reporte
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "El reporte ya se encuentra registrado",
                    reporte: reporte
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _c.sent();
                console.log(error_3);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un error contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getReporte = getReporte;
var searchReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, fecha, _c, placa, reportes, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.query, _b = _a.fecha, fecha = _b === void 0 ? "" : _b, _c = _a.placa, placa = _c === void 0 ? "" : _c;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reporte_associations_1.Reporte.findAll({
                        where: {
                            placa: placa,
                            fecha: fecha
                        }
                    })];
            case 2:
                reportes = _e.sent();
                if (reportes.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: 'No se han encontrado resultados'
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: 'Consulta exitosa',
                    reportes: reportes
                });
                return [3 /*break*/, 4];
            case 3:
                _d = _e.sent();
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchReport = searchReport;
//# sourceMappingURL=reporte.controller.js.map