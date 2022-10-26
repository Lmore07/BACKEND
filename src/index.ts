import cors from "cors";
import Server from "./server/server";
import bodyParser from "body-parser";
import { ValidationError } from "express-validation";
import applyRoutes from "./modules/routes";
import "./connections/mongoDBLogs";
import express, { NextFunction, Request, Response } from "express";
import { CodigosHttpEnum } from "./enum/codigosHttpEnum";

const server = new Server();

/* It's a middleware that will be executed when the route is not found. */
server.app.use("*", cors());
server.app.use(bodyParser.json());
server.app.use(express.json({ limit: "20mb" }));
server.app.use(express.urlencoded({ extended: true, limit: "20mb" }));

/**
 * It's a wrapper for the error response
 * @param {Request} req - Request: The request object.
 * @param {Response} res - Response: The response object that will be sent to the client.
 * @param {number} statusCode - The HTTP status code to return.
 * @param {string} message - The message you want to send to the user.
 */
const wrapperError = (
  req: Request,
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    msj: message,
    data: null,
    tokenValido: false,
  });
};

const handleErrors = async (): Promise<void> => {

  /* This is a middleware that will be executed when the route is not found. */
  server.app.use((_req: Request, res: Response) =>
    wrapperError(_req, res, CodigosHttpEnum.notFound, "Servicio no encontrado")
  );

  server.app.use(
    async (error: any, req: Request, res: Response, next: NextFunction) => {
      if (
        [
          "ForbiddenException",
          "HttpException",
          "AuthenticationException",
        ].includes(error.constructor.name)
      )
        return wrapperError(req, res, error.status, error.message);

      if (error instanceof ValidationError) {
        const message = Object.values(error.details)
          .reduce((a, v) => {
            a.push(...v.map((i: any) => i.message));
            return a;
          }, [])
          .join(" ");
        return wrapperError(req, res, error.statusCode, message);
      }
      return wrapperError(
        req,
        res,
        CodigosHttpEnum.internalServerError,
        error.message
      );
    }
  );
};

applyRoutes(server);
handleErrors();
server.listen();