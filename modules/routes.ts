import { Application } from "express";
import rutaBD from './base-datos/routers'

const applyRoutes=(app:Application) =>{
    console.log("entro a rutas")
    app.use("/api/base-datos",rutaBD)
};

export default applyRoutes;