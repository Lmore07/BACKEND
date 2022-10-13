import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { creaTablaColumnas, insertaFila, obtenerTablas } from "./controller";
import {ValidarIngreso, ValidarInsercion}  from "./validation";

const router=Router()

router.post(
    "/inserta",
    validate(ValidarIngreso,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        var dato=insertaFila(req,res);
        res.json((await dato))
        return next();
    }
)

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        var dato=obtenerTablas(req,res);
        var json = JSON.parse(await dato);
        for (let index = 0; index < json.length; index++) {
            json[index].columnas = JSON.parse(json[index].columnas);            
        }
        res.json(json)
        return next();
    }
)

router.post(
    "/insertar-tabla-columnas",
    validate(ValidarInsercion,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        res.json((await creaTablaColumnas(req,res)))
        return next();
    }
)

export default router;