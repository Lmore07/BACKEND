import { NextFunction, Response, Request, Router } from "express";
import {validate} from "express-validation";
import { ValidarInsercion } from "./validation";
import BaseDatosController from "./controller";
import { CodigosHttpEnum } from "../../enum/codigosHttpEnum";
import { ERROR_POSTGRESQL } from "../../globals/configuration/mensajes";
import ResponseHelper from "../../helpers/responseHelper";
import TokenHelper from "../../helpers/tokenHelper";

const router = Router()

const baseDatosColumnasController = new BaseDatosController();
const responseHelper = new ResponseHelper();
const tokenHelper = new TokenHelper();


/* A route that is used to generate a token. */
router.post(
    "/firmaToken",
    async (req: any, res: Response, next: NextFunction) => {
        tokenHelper.generaToken(req.body,req,res);
    }
)

/* This is a route that is used to get the tables and columns. */
router.get(
    "/mostrar/tablas-columnas",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerTablasColumnas();
                responseHelper.success(req, res, data, "Mostrar Tablas y Columnas");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

/* This is a route that is used to get the tables. */
router.get(
    "/mostrar/tablas",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerTablas();
                responseHelper.success(req, res, data, "Mostrar Tablas");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

router.get(
    "/detalles/tablas/:id",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerDetalleTabla(req);
                responseHelper.success(req, res, data, "Mostrar Tablas");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

/* A route that is used to get the columns of a table. */
router.get(
    "/mostrar/columnas/:table",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerColumnas(req);
                responseHelper.success(req, res, data, "Mostrar Columnas");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

/* This is a route that is used to create a table and columns. */
router.post(
    "/crear/tabla-columnas",
    validate(ValidarInsercion),
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.crearTablaColumnas(req);
                responseHelper.success(req, res, { data: "INSERTADO CORRECTAMENTE" }, "INSERTAR TABLAS Y COLUMNAS");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

router.delete(
    "/borrar/tabla/:idTable",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.borrarTablas(req);
                responseHelper.success(req, res, { data: "TABLA ELIMINADA" }, "BORRAR TABLA");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)

router.delete(
    "/borrar/columnas/:idTable&:idColumna",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.borrarColumna(req);
                responseHelper.success(req, res, { data: "COLUMNA ELIMINADA" }, "ELIMINAR COLUMNA");
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO",null);
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code,error.detail),null);
        }
    }
)


export default router;