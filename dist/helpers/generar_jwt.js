"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generarJWT = function (cedula) {
    if (cedula === void 0) { cedula = ""; }
    return new Promise(function (resolve, reject) {
        var payload = { cedula: cedula };
        jsonwebtoken_1.default.sign(payload, "q7497437_U&#UEOUEW@$%", function (err, token) {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generar_jwt.js.map