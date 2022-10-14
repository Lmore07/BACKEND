import express, { Application } from 'express';
import rutas from "../modules/routes"
import bodyParser from "body-parser";
import cors from "cors";

class Server{
    private app:Application;
    private port:string;

    constructor(){
        const options: cors.CorsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
          };
        this.app=express();
        this.app.use(cors(options));
        this.app.use(bodyParser.json());
        this.port=process.env.PORT || "3001";
        rutas(this.app);
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log("Servidor corriendo en http://localhost:"+this.port);
        })
    }
}

export default Server;