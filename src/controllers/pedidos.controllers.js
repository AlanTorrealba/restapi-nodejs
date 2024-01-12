import { pool } from "../db.js";

export const getPedidos = async (req, res) => {
    try {
      const [rows] = await pool.query(`
      SELECT
      Pedidos.pedido_id,
      Clientes.nombre AS nombre_cliente,
      Usuarios.nombre AS nombre_usuario,
      Repartidores.nombre AS nombre_repartidor,
      Pedidos.estatus_pedido
  FROM Pedidos
  JOIN Clientes ON Pedidos.cliente_id = Clientes.cliente_id
  JOIN Usuarios ON Pedidos.usuario_id = Usuarios.usuario_id
  LEFT JOIN Repartidores ON Pedidos.repartidor_id = Repartidores.repartidor_id
  ORDER BY Pedidos.pedido_id ASC;  -- Ordenar por pedido_id de forma ascendente
  `)
      console.log(rows)
      rows != [] ? res.json(rows) : res.json(false);
    } catch (error) {
      return res.status(500).json({
        message: "Somethin goes wrong",
      });
    }
}