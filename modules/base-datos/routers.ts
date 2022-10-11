import { NextFunction, Response, Request,Router } from "express";
import { validate } from "express-validation";
import { obtener_tablas } from "./controller";
import { ValidarIngreso } from "./validation";

const router=Router()

router.post(
    "/tablas",
    validate(ValidarIngreso,{},{}),
    async (req:Request, res:Response, next:NextFunction) =>{
        console.log("guardar datos")
        console.log(validate(ValidarIngreso,{},{}))
        res.json({datos:"datos"})
        return next();
    }
)

router.get(
    "/mostrar",
    async (req:Request, res:Response, next:NextFunction) =>{
        console.log("mostrar datos")
        let datos=obtener_tablas(req,res);
        //res.json({datos:datos})
        return next();
    }
)

export default router;