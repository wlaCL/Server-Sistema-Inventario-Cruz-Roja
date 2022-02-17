import {Request, Response } from "express";
import Reporte from '../models/reporte.model';
import Trabaja from '../models/trabaja.model';
import Persona from '../models/persona.model';
import Registro_Producto from '../models/registro_producto';
import Producto_Ambulancia from '../models/producto_ambulancia';
import Producto from '../models/producto.model';
import TProducto from '../models/tipo_producto.model';
import Categoria from '../models/categoria.model';

const PdfkitConstruct = require('pdfkit-construct');
//import PdfkitConstruct from 'pdfkit-construct';
import Ambulancia from '../models/ambulancia.model';
const PDFDocument = require("pdfkit-table");  



export const createReportPDF = async (req:Request, res: Response)=>{
    console.log("Soy la funcion correcta**************************")
    const {id = ""} = req.params;
    console.log(id);

    try{

        const productos:any = await Categoria.findAll({
            attributes:['nombre'], 
            include:[
                {
                    model: TProducto, 
                    attributes:['nombre', 'id_tipoprod'],
                    where:{},
                    include: [
                        {
                            model:Producto,
                            attributes:['fecha_caducidad', 'id_producto'], 
                            where:{},
                            include:[
                                {
                                    model: Producto_Ambulancia,
                                    attributes: ['id_producambu', 'stock'], 
                                    where:{},
                                    include:[
                                        {
                                            model: Registro_Producto, 
                                            attributes:['cant_consumo', 'carga'], 
                                            where:{},
                                            include:[
                                                {
                                                    model: Reporte,
                                                    attributes:['id_reporte'],
                                                    where:{
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
        })

        const reporte:any = await Reporte.findOne({
            include:[
                {
                    model: Trabaja,
                    attributes:['id_trabaja'], 
                    include:[
                        {
                            model: Persona, 
                            include:[
                                {
                                    model: Ambulancia
                                }
                            ]
                        }
                     ]
                    
                }, 
            ],
            where:{
                id_reporte: id
            }
        });       
        
        
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
        .text(`Responsable (Paramédico): ${reporte.trabaja.persona.nombre}  ${reporte.trabaja.persona.apellido}                                                      Base: ${reporte.base}`,{
            with: 440,
            align: 'left'
        });
        
        doc
        .font('Times-Roman')
        .fontSize(10)
        .text(`Asistente: ${reporte.asistente}                                                                                  Móvil: ${reporte.trabaja.persona.ambulancia[0].num_vehiculo}`,{
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
                        fecha: (pr.fecha_caducidad != undefined)?`${pr.fecha_caducidad}`:'N/A',
                        cant_consumo: (pr.producto_ambulancia[0].registro_productos[0].cant_consumo != undefined)?`${pr.producto_ambulancia[0].registro_productos[0].cant_consumo}`:'N/A', 
                        carga: (pr.producto_ambulancia[0].registro_productos[0].carga != undefined)? `${pr.producto_ambulancia[0].registro_productos[0].carga}`: 'N/A', 
                        stock: (pr.producto_ambulancia[0].stock != undefined)?`${pr.producto_ambulancia[0].stock}`: 'N/A', 
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
        .text(`Novedades:`,{
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
      
        doc.end();
        
        /*res.status(200).json({
            ok: true, 
            msg: "TODO SALIO BIEN", 
            productos
        });*/
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: "Ha ocurrido un error contáctate con el administrador"
        });
    }

}


