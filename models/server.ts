import express, { Application } from 'express';
import rutas from "../modules/routes"
import cors from "cors"

class Server{
    private app:Application;
    private port:string;

    constructor(){
        this.app=express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.port=process.env.PORT || "3001";
        console.log(process.env.PASSWORD);
        rutas(this.app);
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log("Servidor corriendo en "+this.port);
        })
    }
}

export default Server;