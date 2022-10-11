"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
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
exports.pool = new pg_1.Pool(config);
