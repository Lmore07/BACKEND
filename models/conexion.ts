import {Pool, PoolConfig} from "pg";

var config:PoolConfig={};

try {
    config = {
        user: process.env.USERDB,
        host: process.env.HOST,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 5432
    }
} catch (error) {
    console.log(error);
}

export var pool=new Pool(config) 
