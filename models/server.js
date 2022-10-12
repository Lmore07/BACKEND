"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../modules/routes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.port = process.env.PORT || "3001";
        console.log(process.env.PASSWORD);
        (0, routes_1.default)(this.app);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en " + this.port);
        });
    }
}
exports.default = Server;
