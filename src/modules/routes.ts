import Server from "../server/server";
import rutaBD from './base-datos/router'
import rutaPerfilesUsuarios from './perfiles-usuarios/routers'

const applyRoutes=(server:Server) =>{
    server.app.use("/api/base-datos",rutaBD),
    server.app.use("/api/perfiles-usuarios",rutaPerfilesUsuarios)
};

export default applyRoutes;