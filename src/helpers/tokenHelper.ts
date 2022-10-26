import { CodigosHttpEnum } from "../enum/codigosHttpEnum";
import ResponseHelper from "../helpers/responseHelper";
import jwt from "jsonwebtoken"
import { SECRET } from '../globals/configuration/environment';
import * as jose from 'jose'

const responseHelper = new ResponseHelper();

export default class TokenHelper {

    async vericaExisteToken(req:any, res:any, next:any){
        const bearerHeader = req. headers ['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
        }else{
            responseHelper.fail(req,res, CodigosHttpEnum.forbidden, "Token no encontrado",null);
        }
        next();
    }

    async generaToken(objeto:any,req:any,res:any){
        jwt.sign(objeto, SECRET, (err: any, token: any) => {
            res.send({token:token})
        });
    }

    /*async generaTokenJOSE(objeto:any,req:any,res:any){
        await new jose.SignJWT({})
        .setExpirationTime('10m')
        .setProtectedHeader('');
    }*/


    async verificaToken(token:string){
        var valido = false
        jwt.verify(token,SECRET, (err, data) =>{
            if(err)
                valido = false;
            else
                valido = true;
        });
        return valido;
    }
}