import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { creaTablaColumnas, obtenerTablas } from "./controller";
import {ValidarInsercion}  from "./validation";

const router=Router()

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        var json = JSON.parse(await obtenerTablas(req,res));
        json.forEach((tabla: { columnas: string; }) => {
            tabla.columnas=JSON.parse(tabla.columnas); 
        });
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