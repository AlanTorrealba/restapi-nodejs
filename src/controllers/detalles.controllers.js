import { pool } from "../db.js";
export const getDetalles = async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await pool.query(
      `
        SELECT d.detalle_id, p.nombre, d.cantidad, d.estatus, d.precio_unitario, d.pedido_id  FROM detallespedido d left join
     productos p on d.producto_id = p.producto_id where pedido_id = ?;
      `,
      [id]
    );
    rows != [] ? res.json(rows) : res.json(false);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
    });
  }
};
export const postDetalles = async (req, res) => {
  const { pedidoId, products, cantidad } = req.body.params;
  console.log(pedidoId, products, cantidad);

  try {
    // Insertar el detalle del pedido con subconsulta para obtener el precio_unitario
    const [rows] = await pool.query(
      `
      INSERT INTO detallespedido (pedido_id, producto_id, cantidad, estatus, precio_unitario)
      VALUES (?, ?, ?, ?, (SELECT precio FROM productos WHERE producto_id = ?))
      `,
      [pedidoId, products, cantidad, 1, products]
    );

    res.status(200).json({
      success: true,
      data: rows,
      message: "Pedido creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something goes wrong",
    });
  }
};
export const patchDetalles = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      "UPDATE Pedidos SET estatus = ?, estatus_pedido = ? WHERE pedido_id = ?",
      [1, "Nuevo", id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Pedido not found",
      });
    }

    res.json("Pedido reciclado exitosamente");
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const deleteDetalles = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      "UPDATE Pedidos SET estatus = ?, estatus_pedido = ? WHERE pedido_id = ?",
      [0, "eliminado", id]
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
