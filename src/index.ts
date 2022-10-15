import cors from 'cors';
import Server from './server/server';
import bodyParser from "body-parser";
import applyRoutes from "./modules/routes";


const server = new Server();

server.app.use("*",cors());
server.app.use(bodyParser.json());

applyRoutes(server);

server.listen();