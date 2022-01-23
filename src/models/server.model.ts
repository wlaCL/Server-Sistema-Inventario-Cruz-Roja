import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import db from '../db/connection.db';
import usuariosRouter from '../routes/usuario.route';
import categoriasRouter from '../routes/categoria.route';
import produtosRouter from '../routes/producto.route';
import ambulanciaRouter from '../routes/ambulancia.route';
import producto_ambulancia_router from '../routes/producto_ambulancia';
import producto_registro_router from '../routes/inventario.route';
import reporteRouter from '../routes/reporte.route';
import authRouter from '../routes/auth.route';

require('../db/associations');
class Server{

    private app: Application;
     //private port: string | undefined;  aquí se utiliza para poder asignar dos tipos de valores;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios', 
        categorias: '/api/categorias', 
        productos: '/api/productos', 
        ambulancia:'/api/ambulancias', 
        productos_ambulancias: '/api/productos_ambulancias',
        inventario: '/api/inventario',
        reporte: '/api/reporte', 
        auth: '/api/auth'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        
        //conectar base de datos
        this.dbConnection();

        //definir midlewares
        this.middlewares();        

        //definir mis rutas
        this.routes();
    }

    //TODO: conectar base de datos

    async dbConnection(){
        try{
            await db.authenticate(); 
            console.log("Base de  datos conectada");
           //Realizar la conexión en la conexion mediante con variables de entorno 

        }catch(error:any){
            throw new Error(error);
        }
    }

    // middlewares 

    middlewares(){
        //cors
        this.app.use(cors());

        //helmet: capa de seguridad para ataques http
        this.app.use(helmet());

        //lectura de json
        this.app.use(express.json());

        //
        this.app.use(express.urlencoded({extended:true}));

        //carpeta pública
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.apiPath.usuarios, usuariosRouter);
        this.app.use(this.apiPath.categorias, categoriasRouter);
        this.app.use(this.apiPath.productos, produtosRouter);
        this.app.use(this.apiPath.ambulancia, ambulanciaRouter);
        this.app.use(this.apiPath.productos_ambulancias,producto_ambulancia_router); 
        this.app.use(this.apiPath.inventario, producto_registro_router);
        this.app.use(this.apiPath.reporte, reporteRouter);
        this.app.use(this.apiPath.auth, authRouter);
}


    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto  ${this.port}`);
        });
    }
}

export default Server;