import cors from 'cors';
import Server from './server/server';
import bodyParser from "body-parser";
import applyRoutes from "./modules/routes";
import "./connections/mongoDBLogs"

const server = new Server();

server.app.use("*",cors());
server.app.use(bodyParser.json());

applyRoutes(server);

server.listen();