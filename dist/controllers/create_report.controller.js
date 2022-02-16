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
exports.createReportPDF = void 0;
var reporte_model_1 = __importDefault(require("../models/reporte.model"));
var trabaja_model_1 = __importDefault(require("../models/trabaja.model"));
var persona_model_1 = __importDefault(require("../models/persona.model"));
var registro_producto_1 = __importDefault(require("../models/registro_producto"));
var producto_ambulancia_1 = __importDefault(require("../models/producto_ambulancia"));
var producto_model_1 = __importDefault(require("../models/producto.model"));
var tipo_producto_model_1 = __importDefault(require("../models/tipo_producto.model"));
var categoria_model_1 = __importDefault(require("../models/categoria.model"));
var PdfkitConstruct = require('pdfkit-construct');
//import PdfkitConstruct from 'pdfkit-construct';
var ambulancia_model_1 = __importDefault(require("../models/ambulancia.model"));
var PDFDocument = require("pdfkit-table");
var createReportPDF = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, productos, reporte, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params.id, id = _a === void 0 ? "" : _a;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, categoria_model_1.default.findAll({
                        attributes: ['nombre'],
                        include: [
                            {
                                model: tipo_producto_model_1.default,
                                attributes: ['nombre', 'id_tipoprod'],
                                include: [
                                    {
                                        model: producto_model_1.default,
                                        attributes: ['fecha_caducidad', 'id_producto'],
                                        include: [
                                            {
                                                model: producto_ambulancia_1.default,
                                                attributes: ['id_producambu', 'stock'],
                                                include: [
                                                    {
                                                        model: registro_producto_1.default,
                                                        //attributes:['cant_consumo', 'carga'], 
                                                        include: [
                                                            {
                                                                model: reporte_model_1.default,
                                                                attributes: ['id_reporte'],
                                                                where: {
                                                                    //id_reporte: "2dcb31b3-e01d-44bf-bc83-ffc55dba4f25"
                                                                    id_reporte: id
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    })];
            case 2:
                productos = _b.sent();
                return [4 /*yield*/, reporte_model_1.default.findOne({
                        include: [
                            {
                                model: trabaja_model_1.default,
                                attributes: ['id_trabaja'],
                                include: [
                                    {
                                        model: persona_model_1.default,
                                        include: [
                                            {
                                                model: ambulancia_model_1.default
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                        where: {
                            id_reporte: id
                        }
                    })];
            case 3:
                reporte = _b.sent();
                /*
                const doc = new PDFDocument({ margin: 30, size: 'A4' });
        
        
                const filename = 'reporte00001.pdf'
        
                const stream = res.writeHead(200,{
                    'content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=${filename}`
                });
        
                
                doc.on('data', (data:any)=>{stream.write(data)});
                doc.on('end', ()=>{stream.end()});
        
                
                
                doc
                .font('Times-Bold')
                .fontSize(15)
                .text(`CRUZ ROJA ECUATORIANA`,{
                      with: 440,
                      align: 'center'
                   });
                
                doc
                .font('Times-Bold')
                .fontSize(10)
                .text(`JUNTA PROVINCIAL DE SANTO DOMINGO DE LOS TSÁCHILAS`,{
                         with: 440,
                         align: 'center'
                      });
        
                doc
                .font('Times-Bold')
                .fontSize(10)
                .text(`HOJA DE CONTROL DE AMBULANCIA`,{
                    with: 440,
                    align: 'center'
                });
        
                doc
                .font('Times-Roman')
                .fontSize(10)
                .text(`Fecha: ${reporte.fecha}`,{
                    with: 440,
                    align: 'left'
                });
        
                doc
                .font('Times-Roman')
                .fontSize(10)
                .text(`Responsable (Paramédico): ${reporte.trabaja.persona.nombre}  ${reporte.trabaja.persona.apellido}                                                                                       Base: ${reporte.base}`,{
                    with: 440,
                    align: 'left'
                });
                
                doc
                .font('Times-Roman')
                .fontSize(10)
                .text(`Asistente: ${reporte.asistente}                                                                                                                                Móvil: ${reporte.trabaja.persona.ambulancia[0].num_vehiculo}`,{
                    with: 440,
                    align: 'left'
                });
        
                doc
                .font('Times-Roman')
                .fontSize(10)
                .text(`Conductor: ${reporte.conductor}`,{
                    with: 440,
                    align: 'left'
                });
        
               
               // todo el código va aquí
                
                for (let index = 0; index < productos.length; index++) {
                    var element = productos[index];
                    for (let i = 0; i < element.tipo_productos.length; i++) {
                        var product = element.tipo_productos[i];
                        var rowsProducts = [];
        
                        for (let j = 0; j < product.productos.length; j++) {
                            const pr = product.productos[j];
                            
                            const generalObj ={
                                options: { fontSize: 10, separation: true},
                                fecha: (pr.fecha_caducidad != null)?`${pr.fecha_caducidad}`: 'N/A',
                                cant_consumo: `${pr.producto_ambulancia[0].registro_productos[0].cant_consumo}`,
                                carga: `${pr.producto_ambulancia[0].registro_productos[0].carga}`,
                                stock: `${pr.producto_ambulancia[0].stock}`,
                                
                            }
                            rowsProducts.push(generalObj);
        
                        }
        
                        const table = {
                            //title: `Categoría: ${element.nombre}`,
                            //subtitle: `Producto: ${product.nombre}`,
                            headers: [
                              { label:"Fecha", property: 'fecha', width: 60, renderer: null },
                              { label:"Cantidad de consumo", property: 'cant_consumo', width: 100, renderer: null },
                              { label:"Carga", property: 'carga', width: 100, renderer: null },
                              { label:"Stock", property: 'stock', width: 80, renderer: null },
                            ],
        
                            datas: rowsProducts
                          };
                            doc
                                .font('Times-Bold')
                                .fontSize(12)
                                .text(`Categoria: ${element.nombre}`,{
                                    with: 440,
                                    align: 'left'
                            });
        
                            doc
                                .font('Times-Bold')
                                .fontSize(10)
                                .text(`Producto: ${product.nombre}`,{
                                    with: 440,
                                    align: 'left'
                            });
        
                          doc.table( table, {
                            width: 300,
                            columnSpacing: 5,
                            prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8), // {Function}
                            prepareRow: (row:any, indexColumn:any, indexRow:any, rectRow:any, rectCell:any) => {
                            doc.font("Helvetica").fontSize(8);
                            indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15)
                        },
                            
                          });
                                        
                    }
                }
                 
                doc
                .font('Times-Bold')
                .fontSize(12)
                .text(`Novedades: ${reporte.conductor}`,{
                    with: 440,
                    align: 'left'
                });
        
                doc
                .font('Times-Roman')
                .fontSize(12)
                .text(`${reporte.novedades}`,{
                    with: 440,
                    align: 'left'
                });
              
                doc.end();*/
                res.status(200).json({
                    ok: true,
                    msg: "TODO SALIO BIEN",
                    productos: productos
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({
                    ok: false,
                    msg: "Ha ocurrido un error contáctate con el administrador"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createReportPDF = createReportPDF;
//# sourceMappingURL=create_report.controller.js.map