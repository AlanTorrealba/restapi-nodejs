import { pool } from "../db.js";

export const getProducts = async (req, res) => {

    const [rows] = await pool.query("SELECT * FROM productos");
    console.log(rows)
    res.json(rows)


}