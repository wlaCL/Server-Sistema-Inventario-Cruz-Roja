import express, {Application} from "express";
import cors from "cors";
class Server{

    private app: Application;
     //private port: string | undefined;  aquí se utiliza para poder asignar dos tipos de valores;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';

        //conectar base de datos

        //definir midlewares
        this.middlewares();        

        //definir mis rutas
        this.routes();
    }

    //TODO: conectar base de datos

   

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura de json
        this.app.use(express.json());

        //carpeta pública
        this.app.use(express.static('public'));
    }


    routes(){
        //this.app.use(this.apiPath.usuarios, usuariosRouter);
    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto  ${this.port}`);
        });
    }
}

export default Server;