import { Application } from "express";
import rutaBD from './base-datos/routers'
import rutaPerfilesUsuarios from './perfiles-usuarios/routers'

const applyRoutes=(app:Application) =>{
    app.use("/api/base-datos",rutaBD),
    app.use("/api/perfiles-usuarios",rutaPerfilesUsuarios)
};

export default applyRoutes;