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
exports.getUsuarios = exports.getUsuario = exports.actualizarUsuario = exports.deleteUsuario = exports.postUsuario = void 0;
var sequelize_1 = require("sequelize");
var usuario_associations_1 = require("../associations/usuario.associations");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
//crear usuario
var postUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, nombre, _c, apellido, _d, cedula, _e, rol, _f, contrasena, usuario, persona, salt, password, error_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = req.body, _b = _a.nombre, nombre = _b === void 0 ? "" : _b, _c = _a.apellido, apellido = _c === void 0 ? "" : _c, _d = _a.cedula, cedula = _d === void 0 ? "" : _d, _e = _a.rol, rol = _e === void 0 ? "" : _e, _f = _a.contrasena, contrasena = _f === void 0 ? "" : _f;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 5, , 6]);
                return [4 /*yield*/, usuario_associations_1.Persona.create({
                        cedula: cedula,
                        nombre: nombre,
                        apellido: apellido
                    })];
            case 2:
                persona = _g.sent();
                return [4 /*yield*/, usuario_associations_1.Usuario.create({
                        cedula: cedula,
                        roles_sistema: rol
                    })];
            case 3:
                usuario = _g.sent();
                salt = bcryptjs_1.default.genSaltSync();
                password = bcryptjs_1.default.hashSync(contrasena, salt);
                return [4 /*yield*/, usuario_associations_1.Cuenta_Acceso.create({
                        id_usuario: usuario.id_usuario,
                        contrasena: password
                    })];
            case 4:
                _g.sent();
                return [2 /*return*/, res.status(201).json({
                        ok: true,
                        msg: "Usuario registrado exitosamente",
                        usuario: persona
                    })];
            case 5:
                error_1 = _g.sent();
                console.log(error_1);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un error contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postUsuario = postUsuario;
//eliminar el usuario
var deleteUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula, persona, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cedula = req.params.cedula;
                return [4 /*yield*/, usuario_associations_1.Persona.update({
                        estado: false
                    }, {
                        where: {
                            cedula: cedula
                        }
                    })];
            case 1:
                persona = _a.sent();
                if (!persona) {
                    return [2 /*return*/, res.status(404).json({
                            error: "No se encontraron registros"
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: 'Usuario eliminado exitósamente',
                    persona: persona
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUsuario = deleteUsuario;
/*export const getUsuario  = async(req: Request, res: Response) =>{
   const {nombres= "", cedula = ""} = req.params;
   //const nombres = "Abel Wladimir Cevallos Luna";
  //const nombres = "";
   //const cedula = "1714131678";
   console.log("Datos recibidos: " ,nombres, cedula);
   const nombres_completos = nombres.split(' ');
   console.log("nombres completos: ", nombres_completos);
   const {tipo} = req.query;
   let usuario: any;


   try{
       if(tipo === 'emergencia'){
           usuario = await Usuario.findAndCountAll({
               include: {
                   model: Emergencia_Personal,
                   attributes:['correo_electronico']
               },
               where:{
                   [Op.or]:{
                       [Op.and]:{
                           nombres:nombres_completos[0] + ' ' + nombres_completos[1],
                           apellidos:nombres_completos[2] + ' ' + nombres_completos[3],
                       },
                       cedula
                   }
               }
           });
       }
       if(tipo === 'apoyo'){
           usuario = await Usuario.findAndCountAll({
               include: {
                   model: Apoyo_Personal,
                   attributes:{exclude: ['cedula']}
               },
               where:{
                   [Op.or]:{
                       [Op.and]:{
                           nombres:nombres_completos[0] + ' ' + nombres_completos[1],
                           apellidos:nombres_completos[2] + ' ' + nombres_completos[3],
                       },
                       cedula
                   }
               }
           });
       }

       if(usuario.count === 0){
           res.status(400).json({
               msg: "No existe registro con los datos ingresados"
           });
           return
       }

       res.status(200).json({
           msg: "Resultados exitosos",
           usuarios:usuario.rows,
           registros: usuario.count
       });
       
   }catch(error){
       console.log(error);
       res.status(500).json({
           msg: "Ha ocurrido un error contactate con el administrador"
       })
   }
}


//eliminar usuario
export const deleteUsuario = async(req: Request, res: Response)=>{
   const {cedula} = req.params;

   let usuario: any;

   try{
       usuario = await Usuario.findByPk(cedula);

       if(!usuario){
           res.status(400).json({
               msg: "El usuario no se encuentra registrado"
           })
           return
       }
       
       if(usuario.estado === false){
           res.status(400).json({
               msg: "El usuario ya se encuentra desactivado"
           })
           return
       }
   
       usuario = await Usuario.update({estado:false},{
           where:{
               cedula
           }
       })
   
       res.status(200).json({
           msg: "Usuario desactivado",
           usuario
       })

   }catch(error){
       {console.log(error)};
   }
}*/
//actulizar datos
var actualizarUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cedula, _b, _c, nombre, _d, apellido, _e, rol, personadb, persona, usuario, user, error_3;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.params.cedula, cedula = _a === void 0 ? "" : _a;
                _b = req.body, _c = _b.nombre, nombre = _c === void 0 ? "" : _c, _d = _b.apellido, apellido = _d === void 0 ? "" : _d, _e = _b.rol, rol = _e === void 0 ? "" : _e;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, , 7]);
                return [4 /*yield*/, usuario_associations_1.Persona.findOne({
                        where: {
                            cedula: cedula
                        }
                    })];
            case 2:
                personadb = _f.sent();
                return [4 /*yield*/, usuario_associations_1.Persona.update({
                        nombre: (nombre != "") ? nombre : personadb.nombre,
                        apellido: (apellido != "") ? apellido : personadb.apellido,
                    }, {
                        where: {
                            cedula: cedula
                        }
                    })];
            case 3:
                persona = _f.sent();
                return [4 /*yield*/, usuario_associations_1.Usuario.findOne({
                        where: {
                            cedula: cedula
                        }
                    })];
            case 4:
                usuario = _f.sent();
                return [4 /*yield*/, usuario_associations_1.Usuario.update({
                        roles_sistema: (rol == "") ? usuario.roles_sistema : rol
                    }, { where: {
                            cedula: cedula
                        } })];
            case 5:
                user = _f.sent();
                if (user == 0) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No se registraron cambios",
                        })];
                }
                if (user == 0 && persona == 0) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "No se registraron cambios",
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: "Actualización exitosa",
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _f.sent();
                console.log(error_3);
                res.status(500).json({
                    errors: {
                        ok: false,
                        msg: "Ha ocurrido un error contáctate con el administrador"
                    }
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.actualizarUsuario = actualizarUsuario;
var getUsuario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula, usuario, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cedula = req.params.cedula;
                return [4 /*yield*/, usuario_associations_1.Persona.findByPk(cedula, {
                        attributes: ["cedula", "nombre", "apellido", "estado"],
                    })];
            case 1:
                usuario = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        usuario: usuario
                    })];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json({
                    errors: "Ha ocurrido un error contácte con el administrador"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsuario = getUsuario;
var getUsuarios = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, nombre, _c, apellido, personas, error_5;
    var _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = req.params, _b = _a.nombre, nombre = _b === void 0 ? "" : _b, _c = _a.apellido, apellido = _c === void 0 ? "" : _c;
                _j.label = 1;
            case 1:
                _j.trys.push([1, 3, , 4]);
                return [4 /*yield*/, usuario_associations_1.Persona.findAll({
                        where: (_d = {},
                            _d[sequelize_1.Op.or] = {
                                nombre: (_e = {},
                                    _e[sequelize_1.Op.or] = (_f = {},
                                        _f[sequelize_1.Op.startsWith] = nombre,
                                        _f[sequelize_1.Op.substring] = nombre,
                                        _f[sequelize_1.Op.endsWith] = nombre,
                                        _f),
                                    _e),
                                apellido: (_g = {},
                                    _g[sequelize_1.Op.or] = (_h = {},
                                        _h[sequelize_1.Op.startsWith] = apellido,
                                        _h[sequelize_1.Op.substring] = apellido,
                                        _h[sequelize_1.Op.endsWith] = apellido,
                                        _h),
                                    _g)
                            },
                            _d.estado = true,
                            _d)
                    })];
            case 2:
                personas = _j.sent();
                if (personas.length == 0) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No se encontraron registros',
                        })];
                }
                res.status(200).json({
                    ok: true,
                    msg: 'Búsqueda exitosa',
                    personas: personas
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _j.sent();
                console.log(error_5);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUsuarios = getUsuarios;
//# sourceMappingURL=usuario.controller.js.map