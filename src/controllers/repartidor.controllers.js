import { pool } from "../db.js";

export const getRepartidor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM repartidores");
    res.status(200).json({
        success: true,
        rows,
        message: 'consulta exitosa',
      });
  } catch (error) {
    console.error('Error en la inserción:', error);
    return res.status(500).json({
      success: false,
      message: "Somethin goes wrong",
    });
  }

};
