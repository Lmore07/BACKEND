import Server from "../server/server";
import rutaBD from './base-datos/router'
import rutaPerfilesUsuarios from './perfiles-usuarios/routers'

/**
 * This function takes a server object as an argument and applies the routes to the server.
 * @param {Server} server - This is the server object that we created in the index.ts file.
 */
const applyRoutes=(server:Server) =>{
    server.app.use("/api/base-datos",rutaBD),
    server.app.use("/api/perfiles-usuarios",rutaPerfilesUsuarios)
};

export default applyRoutes;