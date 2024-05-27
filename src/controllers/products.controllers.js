import { pool } from "../db.js";

export const getProducts = async (req, res) => {

    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows)


}