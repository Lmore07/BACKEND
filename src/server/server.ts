import express, { Application } from 'express';
import { PORT, HOST } from '../globals/configuration/environment';

class Server{

    app:Application;
    private port:number;
    private host:string;

    constructor(){
        this.app=express();
        this.port=PORT;
        this.host=HOST;
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log(`Servidor levantado http://${this.host}:${this.port}`);
        })
    }
}

export default Server;