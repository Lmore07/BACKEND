import { Request,Response } from "express"

export const obtener_tablas=(req:Request,res:Response) => {
    console.log("controlador")
    res.json({
        msg:"aqui van las tablas"
    })
}