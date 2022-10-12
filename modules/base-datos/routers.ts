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
        let datos=obtenerTablas(req,res);
        res.json((await datos).rows)
        return next();
    }
)

router.post(
    "/insertar-tabla-columnas",
    validate(ValidarInsercion,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        let datos=creaTablaColumnas(req,res);
        res.json((await datos))
        return next();
    }
)

export default router;