import { pool } from "../db.js";

export const getClient = async (req, res) => {

    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows)


}