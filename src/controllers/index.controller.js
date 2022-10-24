import { conexion } from "../db/db.js";

export const query = async (req, res) => {
    const [result] = await conexion.query('SELECT * FROM employee')
    console.log(result)
};

