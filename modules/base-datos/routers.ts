import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { creaTablaColumnas, obtenerTablas } from "./controller";
import {ValidarInsercion}  from "./validation";

const router=Router()

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        res.json((await obtenerTablas(req,res)))
        next();
    }
)

router.post(
    "/insertar-tabla-columnas",
    validate(ValidarInsercion,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        res.json((await creaTablaColumnas(req,res)))
        next();
    }
)

export default router;