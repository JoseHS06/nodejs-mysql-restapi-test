import { createPool } from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '../config.js';

export const conexion = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    charset: 'utf8'
});
