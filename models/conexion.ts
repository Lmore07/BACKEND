import {Pool, PoolConfig} from "pg";
import dotenv from "dotenv"

dotenv.config();
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

var pool=new Pool(config) 

export default pool;