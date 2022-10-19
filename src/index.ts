import cors from 'cors';
import Server from './server/server';
import bodyParser from "body-parser";
import applyRoutes from "./modules/routes";

const server = new Server();

var corsOptions = {
    origin: '*',
}

server.app.use(cors(corsOptions));
server.app.use(bodyParser.json());

applyRoutes(server);

server.listen();