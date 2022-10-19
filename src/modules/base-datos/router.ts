import { NextFunction, Response, Request, Router } from "express";
import { validate } from "express-validation";
import { ValidarInsercion, ValidarPermisos } from "./validation";
import BaseDatosController from "./controller";
import { CodigosHttpEnum } from "../../enum/codigosHttpEnum";
import { ERROR_POSTGRESQL } from "../../globals/configuration/mensajes";
import ResponseHelper from "../../helpers/responseHelper";
import TokenHelper from "../../helpers/tokenHelper";

const router = Router()

const baseDatosColumnasController = new BaseDatosController();
const responseHelper = new ResponseHelper();
const tokenHelper = new TokenHelper();

//probando
router.get(
    "/firmaToken",
    async (req: any, res: Response, nex: NextFunction) => {
        tokenHelper.generaToken({bar:"fo"},req,res);
    }
)

router.get(
    "/mostrar/tablas-columnas",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerTablasColumnas();
                responseHelper.success(req, res, data, "Mostrar Tablas y Columnas");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)


router.get(
    "/mostrar/tablas",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerTablas();
                responseHelper.success(req, res, data, "Mostrar Tablas");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

router.get(
    "/mostrar/columnas/:table",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                const data = await baseDatosColumnasController.obtenerColumnas(req);
                responseHelper.success(req, res, data, "Mostrar Columnas");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

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
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

router.post(
    "/otorgar-permisos",
    tokenHelper.vericaExisteToken,
    validate(ValidarPermisos, {}, {}),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.otorgarPermisosTablas(req);
                responseHelper.success(req, res, { data: "PERMISO CONCEDIDO" }, "GESTION DE PERMISOS");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

router.delete(
    "/borrar/tabla/:tableName",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.borrarTablas(req);
                responseHelper.success(req, res, { data: "TABLA ELIMINADA" }, "BORRAR TABLA");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

router.delete(
    "/borrar/columnas/:tableName&:columna",
    tokenHelper.vericaExisteToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            var request: any = req;
            if (await tokenHelper.verificaToken(request.token)) {
                await baseDatosColumnasController.borrarColumna(req);
                responseHelper.success(req, res, { data: "COLUMNA ELIMINADA" }, "ELIMINAR COLUMNA");
                next();
            } else {
                responseHelper.fail(req, res, CodigosHttpEnum.unAuthorized, "TOKEN NO VALIDO");
                next();
            }
        } catch (error: any) {
            responseHelper.fail(req, res, CodigosHttpEnum.badRequest, ERROR_POSTGRESQL(error.code));
        }
    }
)

export default router;