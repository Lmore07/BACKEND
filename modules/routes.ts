import { Application } from "express";
import rutaBD from './base-datos/routers'

const applyRoutes=(app:Application) =>{
    app.use("/api/base-datos",rutaBD)
};

export default applyRoutes;