import { CodigosHttpEnum } from "../enum/codigosHttpEnum";
import { ResponseInterface } from "../interfaces/responseHelper.interface";
import { Request, Response } from "express";
import { TRANSACCION_EXITOSA } from "../globals/configuration/mensajes";
import _ from "lodash";


export default class ResponseHelper {
    
    private respEndpoint: ResponseInterface = {
        msj            : '',
        data           : null,
        tokenValido    : false
    };

    async success(
        req: Request,
        res: Response,
        data: any,
        observacion?: string
    ) {
        this.respEndpoint.msj             = TRANSACCION_EXITOSA;
        this.respEndpoint.data            = data;
        this.respEndpoint.tokenValido     = true;

        return res.status(CodigosHttpEnum.ok).send({
            ...this.respEndpoint
        });
    }

    async fail(
        req: Request,
        res: Response,
        codErrorHttp: number,
        err: any
    ) {
        this.respEndpoint.data            = null;
        this.respEndpoint.tokenValido     = false;
        this.respEndpoint.msj = _.isObject(err) ? (err as any).message : err;

        return res.status(codErrorHttp).send({
            ...this.respEndpoint
        });
    }

    
}