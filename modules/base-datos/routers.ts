import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { obtener_tablas } from "./controller";
import { ValidarIngreso } from "./validation";

const router=Router()

router.post(
    "/tablas",
    validate(ValidarIngreso,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        res.json({datos:"datos"})
        return next();
    }
)

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        let datos=obtener_tablas(req,res);
        res.json({datos:(await datos).rows})
        return next();
    }
)

export default router;