import express, { Application } from 'express';
import rutas from "../modules/routes"
import bodyParser from "body-parser";

class Server{
    private app:Application;
    private port:string;

    constructor(){
        this.app=express();
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