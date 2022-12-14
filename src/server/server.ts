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

    /**
     * The listen() function is a method of the app object that is created in the constructor. It takes
     * two parameters, the port number and a callback function. The callback function is executed when
     * the server is up and running
     */
    listen(){
        this.app.listen(this.port,this.host,() =>{
            console.log(`Servidor levantado http://${this.host}:${this.port}`);
        })
    }
}

export default Server;