import { CodigosHttpEnum } from "../enum/codigosHttpEnum";
import { ResponseInterface } from "../interfaces/responseHelper.interface";
import { Request, Response } from "express";
import { TRANSACCION_EXITOSA } from "../globals/configuration/mensajes";
import _ from "lodash";

export default class ResponseHelper {
    
    /* A private variable that is used to store the response that will be sent to the client. */
    private respEndpoint: ResponseInterface = {
        msj            : '',
        data           : null,
        tokenValido    : false
    };

    /**
     * A function that returns a response to the client.
     * @param {Request} req - Request,
     * @param {Response} res - Response: The response object.
     * @param {any} data - The data you want to send back to the client.
     * @param {string} [observacion] - This is an optional parameter that is used to send a message to
     * the frontend.
     * @returns The response is being returned with the status code 200 and the response object.
     */
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

    /**
     * It returns a response with the status code and the response object
     * @param {Request} req - Request,
     * @param {Response} res - Response: The response object that will be returned to the client.
     * @param {number} codErrorHttp - The HTTP error code to be returned.
     * @param {any} err - any,
     * @param {any} data - The data that will be sent to the client.
     * @returns The response object with the status code and the response object.
     */
    async fail(
        req: Request,
        res: Response,
        codErrorHttp: number,
        err: any,
        data: any
    ) {
        this.respEndpoint.data            = data;
        this.respEndpoint.tokenValido     = false;
        this.respEndpoint.msj = _.isObject(err) ? (err as any).message : err;

        return res.status(codErrorHttp).send({
            ...this.respEndpoint
        });
    }
    
}