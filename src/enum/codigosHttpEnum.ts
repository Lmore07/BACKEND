/* Creating a enum with the name CodigosHttpEnum and the values ok, created, badRequest, unAuthorized,
forbidden, notFound, internalServerError, notImplement, badGateway. */
export const enum CodigosHttpEnum {
    ok                  = 200,
    created             = 201,
    badRequest          = 400,
    unAuthorized        = 401,
    forbidden           = 403,
    notFound            = 404,
    internalServerError = 500,
    notImplement        = 501,
    badGateway          = 502
}