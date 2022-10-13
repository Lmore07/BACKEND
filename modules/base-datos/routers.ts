import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { creaTablaColumnas, obtenerTablas } from "./controller";
import {ValidarInsercion}  from "./validation";

const router=Router()

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        var json = JSON.parse(await obtenerTablas(req,res));
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