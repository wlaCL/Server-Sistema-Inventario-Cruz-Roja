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
exports.validarCedula = exports.AlmenosUnCampo = exports.tamanoContrasena = void 0;
var error_1 = __importDefault(require("../models/errors/error"));
var tamanoContrasena = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, contrasena, obj;
    return __generator(this, function (_b) {
        _a = req.body.contrasena, contrasena = _a === void 0 ? "" : _a;
        if (contrasena != "") {
            if (contrasena.length < 10) {
                obj = new error_1.default(contrasena, "La contraseña debe al menos tener 10 caracteres");
                return [2 /*return*/, res.status(422).json({
                        errors: obj.ErrorObj
                    })];
            }
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.tamanoContrasena = tamanoContrasena;
var AlmenosUnCampo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, nombre, _c, apellido, _d, rol, _e, estado, obj;
    return __generator(this, function (_f) {
        _a = req.body, _b = _a.nombre, nombre = _b === void 0 ? "" : _b, _c = _a.apellido, apellido = _c === void 0 ? "" : _c, _d = _a.rol, rol = _d === void 0 ? "" : _d, _e = _a.estado, estado = _e === void 0 ? "" : _e;
        if (nombre === "" && apellido === "" && estado === "" && rol === "") {
            obj = new error_1.default(" nombre = ?, apellido = ?, rol = ?, estado = ? ", "No se detecto datos actualizar");
            return [2 /*return*/, res.status(422).json({
                    errors: obj.ErrorObj
                })];
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.AlmenosUnCampo = AlmenosUnCampo;
var validarCedula = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula;
    return __generator(this, function (_a) {
        cedula = req.body.cedula;
        return [2 /*return*/];
    });
}); };
exports.validarCedula = validarCedula;
//# sourceMappingURL=validar_campos_usuario.js.map