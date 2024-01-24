import { pool } from "../db.js";

export const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
      Pedidos.pedido_id,
      Clientes.nombre AS nombre_cliente,
      Usuarios.nombre AS nombre_usuario,
      Repartidores.nombre AS nombre_repartidor,
      Pedidos.estatus_pedido,
      Pedidos.estatus
  FROM Pedidos
  JOIN Clientes ON Pedidos.cliente_id = Clientes.cliente_id
  JOIN Usuarios ON Pedidos.usuario_id = Usuarios.usuario_id
  LEFT JOIN Repartidores ON Pedidos.repartidor_id = Repartidores.repartidor_id
  ORDER BY Pedidos.pedido_id DESC;  -- Ordenar por pedido_id de forma ascendente
  `);
    rows != [] ? res.json(rows) : res.json(false);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
    });
  }
};

export const postPedidos = async (req, res) => {
  const { cliente, repartidor, usuario } = req.body.params;
  console.log("req:", req.body);
  try {
    const [rows] = await pool.query(
      "INSERT INTO Pedidos (cliente_id, usuario_id, repartidor_id, estatus_pedido) VALUES (?, ?, ?, ?)",
      [cliente, usuario, repartidor, "Nuevo"]
    );
    // console.log("res:",res)
    // console.log("row", rows)
    // res.json("Pedido creado exitosamente");
    res.status(200).json({
      success: true,
      data: rows,
      message: 'Pedido creado exitosamente',
    });
  } catch (error) {
    console.error('Error en la inserción:', error);
    return res.status(500).json({
      success: false,
      message: "Somethin goes wrong",
    });
  }
};

export const deletePedidos = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      "UPDATE Pedidos SET estatus = ?, estatus_pedido = ? WHERE pedido_id = ?",
      [0, "eliminado" , id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Pedido not found",
      });
    }

    res.json("Pedido eliminado exitosamente");
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
