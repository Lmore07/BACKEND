"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {};
try {
    config = {
        user: process.env.USERDB,
        host: process.env.HOST,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 5432
    };
}
catch (error) {
    console.log(error);
}
var pool = new pg_1.Pool(config);
exports.default = pool;
