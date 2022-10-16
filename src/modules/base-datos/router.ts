import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import {ValidarInsercion, ValidarPermisos}  from "./validation";
import BaseDatosController from "./controller";
import ResponseHelper from "../../helpers/responseHelper";
import { CodigosHttpEnum } from "../../enum/codigosHttpEnum";
import { ERROR_POSTGRESQL } from "../../globals/configuration/mensajes";

const router=Router()

const baseDatosColumnasController = new BaseDatosController();
const responseHelper = new ResponseHelper();

router.get(
    "/tablas-columnas",
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const data = await baseDatosColumnasController.obtenerTablasColumnas();
            responseHelper.success( req,res,data,"Mostrar Tablas y Columnas");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

router.get(
    "/mostrar/tablas",
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const data = await baseDatosColumnasController.obtenerTablas();
            responseHelper.success( req,res,data,"Mostrar Tablas y Columnas");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

router.get(
    "/mostrar/columnas/:table",
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const data = await baseDatosColumnasController.obtenerColumnas(req);
            responseHelper.success( req,res,data,"Mostrar Tablas y Columnas");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)


router.post(
    "/crear/tabla-columnas",
    validate(ValidarInsercion,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            await baseDatosColumnasController.crearTablaColumnas(req);
            responseHelper.success(req,res,{data:"INSERTADO CORRECTAMENTE"},"INSERTAR TABLAS Y COLUMNAS");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

router.post(
    "/otorgar-permisos",
    validate(ValidarPermisos,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        try {
            await baseDatosColumnasController.otorgarPermisosTablas(req);
            responseHelper.success(req,res,{data:"PERMISO CONCEDIDO"},"GESTION DE PERMISOS");
        } catch (error:any) {
            responseHelper.fail(req,res,CodigosHttpEnum.badRequest,ERROR_POSTGRESQL(error.code));
        }
        next();
    }
)

export default router;