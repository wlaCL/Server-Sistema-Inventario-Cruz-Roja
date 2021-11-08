"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server() {
        this.apiPath = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        //conectar base de datos
        //definir midlewares
        this.middlewares();
        //definir mis rutas
        this.routes();
    }
    //TODO: conectar base de datos
    Server.prototype.middlewares = function () {
        //cors
        this.app.use((0, cors_1.default)());
        //lectura de json
        this.app.use(express_1.default.json());
        //carpeta pública
        this.app.use(express_1.default.static('public'));
    };
    Server.prototype.routes = function () {
        //this.app.use(this.apiPath.usuarios, usuariosRouter);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Servidor corriendo en el puerto  " + _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map