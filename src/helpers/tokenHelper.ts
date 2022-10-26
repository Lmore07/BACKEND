import { CodigosHttpEnum } from "../enum/codigosHttpEnum";
import ResponseHelper from "../helpers/responseHelper";
import jwt from "jsonwebtoken"
import { SECRET } from '../globals/configuration/environment';

const responseHelper = new ResponseHelper();

export default class TokenHelper {

    /**
     * It verifies that the token is in the header of the request.
     * @param {any} req - The request object.
     * @param {any} res - The response object.
     * @param {any} next - The next middleware function in the stack.
     */
    async vericaExisteToken(req:any, res:any, next:any){
        const bearerHeader = req. headers ['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        }else{
            responseHelper.fail(req,res, CodigosHttpEnum.forbidden, "Token no encontrado",null);
        }
    }

    /**
     * It generates a token for the user.
     * @param {any} objeto - The object that will be encoded in the token.
     * @param {any} req - The request object.
     * @param {any} res - The response object.
     */
    async generaToken(objeto:any,req:any,res:any){
        jwt.sign(objeto, SECRET,{expiresIn:3600}, (err: any, token: any) => {
            res.send({token:token})
        });
    }

    /**
     * It verifies the token.
     * @param {string} token - The token to verify.
     * @returns A boolean value.
     */
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