import {Pool, PoolConfig} from "pg";
import { HOST,DATABASE,PASSWORD,USERDB } from '../globals/configuration/environment';

var config:PoolConfig={};

try {
    config = {
        user: USERDB,
        host: HOST,
        password: PASSWORD,
        database: DATABASE,
        port: 5432
    }
} catch (error) {
    console.log(error);
}

var pool=new Pool(config) 

export default pool;