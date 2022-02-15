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
exports.changePasswordUser = exports.changePasswordWeb = exports.loginWeb = exports.loginApp = void 0;
var usuario_associations_1 = require("../associations/usuario.associations");
var generar_jwt_1 = require("../helpers/generar_jwt");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var loginApp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cedula, password, dispositivo, persona, usuario, cuenta, validPassword, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, cedula = _a.cedula, password = _a.password, dispositivo = _a.dispositivo;
                return [4 /*yield*/, usuario_associations_1.Persona.findByPk(cedula)];
            case 1:
                persona = _b.sent();
                if (!persona) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                if (!persona.estado) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Usuario.findOne({
                        where: {
                            cedula: persona.cedula
                        }
                    })];
            case 2:
                usuario = _b.sent();
                if (!usuario) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                if (usuario.roles_sistema != "user_app") {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.findByPk(usuario.id_usuario)];
            case 3:
                cuenta = _b.sent();
                validPassword = bcryptjs_1.default.compareSync(password, cuenta.contrasena);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, (0, generar_jwt_1.generarJWT)(persona.cedula)];
            case 4:
                token = _b.sent();
                return [4 /*yield*/, usuario_associations_1.Usuario.update({
                        dispositivo: dispositivo
                    }, {
                        where: {
                            cedula: cedula
                        }
                    })];
            case 5:
                _b.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Acceso Exitóso",
                    persona: persona,
                    token: token
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.loginApp = loginApp;
var loginWeb = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cedula, password, persona, usuario, cuenta, validPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, cedula = _a.cedula, password = _a.password;
                return [4 /*yield*/, usuario_associations_1.Persona.findByPk(cedula)];
            case 1:
                persona = _b.sent();
                if (!persona) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                if (!persona.estado) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Usuario.findOne({
                        where: {
                            cedula: persona.cedula
                        }
                    })];
            case 2:
                usuario = _b.sent();
                if (!usuario) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                if (usuario.roles_sistema != "user_web") {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.findByPk(usuario.id_usuario)];
            case 3:
                cuenta = _b.sent();
                validPassword = bcryptjs_1.default.compareSync(password, cuenta.contrasena);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Usuario y/o contraseña no son válidos"
                        })];
                }
                return [4 /*yield*/, (0, generar_jwt_1.generarJWT)(persona.cedula)];
            case 4:
                token = _b.sent();
                res.status(200).json({
                    ok: true,
                    msg: "Acceso Exitóso",
                    persona: persona,
                    token: token
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.loginWeb = loginWeb;
var changePasswordWeb = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cedula, contrasena, nuevacontrasena, persona, usuario, acceso, validPassword, salt, newPassword, access, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, cedula = _a.cedula, contrasena = _a.contrasena, nuevacontrasena = _a.nuevacontrasena;
                return [4 /*yield*/, usuario_associations_1.Persona.findByPk(cedula)];
            case 1:
                persona = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                // si se quiere actualizar la contrasena de un usuario no registrado
                if (!persona) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No es posible realizar está operación"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Usuario.findOne({
                        where: {
                            cedula: persona.cedula
                        }
                    })];
            case 3:
                usuario = _b.sent();
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.findOne({
                        where: {
                            id_usuario: usuario.id_usuario
                        }
                    })];
            case 4:
                acceso = _b.sent();
                validPassword = bcryptjs_1.default.compareSync(contrasena, acceso.contrasena);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Contraseña inválida"
                        })];
                }
                salt = bcryptjs_1.default.genSaltSync();
                newPassword = bcryptjs_1.default.hashSync(nuevacontrasena, salt);
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.update({
                        contrasena: newPassword
                    }, {
                        where: {
                            id_usuario: acceso.id_usuario
                        }
                    })];
            case 5:
                access = _b.sent();
                if (access == 1) {
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            msg: "Actualización exitósa"
                        })];
                }
                res.status(400).json({
                    ok: false,
                    msg: "No se ha podido realizar la actualización de contraseña"
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.changePasswordWeb = changePasswordWeb;
var changePasswordUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, contrasena, nuevacontrasena, cedula, persona, usuario, acceso, validPassword, salt, newPassword, access, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, contrasena = _a.contrasena, nuevacontrasena = _a.nuevacontrasena;
                cedula = req.user;
                return [4 /*yield*/, usuario_associations_1.Persona.findByPk(cedula)];
            case 1:
                persona = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                // si se quiere actualizar la contrasena de un usuario no registrado
                if (!persona) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            msg: "No es posible realizar está operación"
                        })];
                }
                return [4 /*yield*/, usuario_associations_1.Usuario.findOne({
                        where: {
                            cedula: persona.cedula
                        }
                    })];
            case 3:
                usuario = _b.sent();
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.findOne({
                        where: {
                            id_usuario: usuario.id_usuario
                        }
                    })];
            case 4:
                acceso = _b.sent();
                validPassword = bcryptjs_1.default.compareSync(contrasena, acceso.contrasena);
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "Contraseña inválida"
                        })];
                }
                salt = bcryptjs_1.default.genSaltSync();
                newPassword = bcryptjs_1.default.hashSync(nuevacontrasena, salt);
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.update({
                        contrasena: newPassword
                    }, {
                        where: {
                            id_usuario: acceso.id_usuario
                        }
                    })];
            case 5:
                access = _b.sent();
                if (access == 1) {
                    return [2 /*return*/, res.status(200).json({
                            ok: true,
                            msg: "Actualización exitósa"
                        })];
                }
                res.status(400).json({
                    ok: false,
                    msg: "No se ha podido realizar la actualización de contraseña"
                });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.changePasswordUser = changePasswordUser;
//# sourceMappingURL=auth.controller.js.map