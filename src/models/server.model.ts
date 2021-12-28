import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";
import db from '../db/connection.db';
import usuariosRouter from '../routes/usuario.route';
import categoriasRouter from '../routes/categoria.route';
import produtosRouter from '../routes/producto.route';
import ambulanciaRouter from '../routes/ambulancia.route';

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
        inventario: '/api/inventario',
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

        //carpeta pública
        this.app.use(express.static('public'));
    }


    routes(){
        this.app.use(this.apiPath.usuarios, usuariosRouter);
        this.app.use(this.apiPath.categorias, categoriasRouter);
        this.app.use(this.apiPath.productos, produtosRouter);
        this.app.use(this.apiPath.ambulancia, ambulanciaRouter);

    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto  ${this.port}`);
        });
    }
}

export default Server;