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
  ORDER BY Pedidos.pedido_id DESC;  -- Ordenar por pedido_id de forma ascendente
  `)
      rows != [] ? res.json(rows) : res.json(false);
    } catch (error) {
      return res.status(500).json({
        message: "Somethin goes wrong",
      });
    }
}

export const postPedidos = async (req, res) =>{
  const { cliente, repartidor, usuario } = req.body.params;
  try{
    console.log(req.body.params.cliente)
    const [rows] = await pool.query(
      "INSERT INTO Pedidos (cliente_id, usuario_id, repartidor_id, estatus_pedido) VALUES (?, ?, ?, ?)",[cliente, repartidor, usuario, "Nuevo"]
  )
    res.json("Pedido creado exitosamente")
  }catch (error){
    return res.status(500).json({
      message: "Somethin goes wrong",
    });
  }
}