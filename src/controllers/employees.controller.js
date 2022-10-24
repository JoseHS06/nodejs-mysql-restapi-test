import { conexion } from "../db/db.js";

export const getEmployees = async (req, res) => {
    try {

        const [rows] = await conexion.query('SELECT * FROM employee');
        res.json(rows);

    } catch (error) {

        return res.status(500).json({
            message: 'Ocurrió un error al ejecutar la query'
        });

    }
}

export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params.id;
        const [rows] = await conexion.query('SELECT * FROM employee WHERE id = ?', [id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        });
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al ejecutar la query'
        });
    }
}

export const createEmployee = async (req, res) => {

    try {
        const { name, salary } = req.body;
        const [rows] = await conexion.query('INSERT INTO employee(name, salary) VALUES (?, ?)', [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al ejecutar la query'
        });
    }
}

export const updateEmployee = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, salary } = req.body;
        
        const [result] = await conexion.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        });

        const [rows] = await conexion.query('SELECT * FROM employee WHERE id = ?', [id]);
        res.json(rows[0]);

    } catch (error) {

        return res.status(500).json({
            message: error
        });
    }

}

export const deleteEmployee = async (req, res) => {

    try {

        const { id } = req.params.id;
        const [result] = await conexion.query('DELETE FROM employee WHERE id = ?', [id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        });
        res.sendStatus(204);

    } catch (error) {

        return res.status(500).json({
            message: 'Ocurrió un error al ejecutar la query'
        });

    }
}