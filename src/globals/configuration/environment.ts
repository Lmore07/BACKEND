import dotenv from 'dotenv';
dotenv.config();

export const HOST:string=process.env.HOST || 'localhost';
export const USERDB:string=process.env.USERDB || 'postgres';
export const PASSWORD:string=process.env.PASSWORD || '12345';
export const DATABASE:string=process.env.DATABASE || 'prueba2';
export const PORT:number=Number(process.env.PORT) || 3356;
