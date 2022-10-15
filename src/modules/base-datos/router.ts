import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import {ValidarInsercion}  from "./validation";
import BaseDatosController from "./controller";
import ResponseHelper from "../../helpers/responseHelper";
import { CodigosHttpEnum } from "../../enum/codigosHttpEnum";
import { ERROR_POSTGRESQL } from "../../globals/configuration/mensajes";

const router=Router()

const baseDatosColumnasController = new BaseDatosController();
const responseHelper = new ResponseHelper();

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const data = await baseDatosColumnasController.obtenerTablasColumnas();
            responseHelper.success( req,res,data,"Mostrar Tablas y Columnas");
        } catch (error:any) {
            console.log(error.code);
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

router.post(
    "/insertar-tabla-columnas",
    validate(ValidarInsercion,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const data : any = await baseDatosColumnasController.creaTablaColumnas(req);
            responseHelper.success(req,res,data,"INSERTAR TABLAS Y COLUMNAS");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

export default router;