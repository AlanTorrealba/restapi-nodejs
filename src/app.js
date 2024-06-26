import express from "express";
import cors from "cors";
import indexrouter from "./routes/index.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import userRoutes from "./routes/user.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import clientRoutes from "./routes/client.routes.js";
import productsRoutes from "./routes/products.routes.js";
import repartidorRoutes from "./routes/repartidor.routes.js";
import detallesRoutes from "./routes/detalles.routes.js"
import cookieParser from "cookie-parser";

import  { PORT } from './config.js'



const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true

}
const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use(indexrouter);
app.use("/api", employeesRoutes);
app.use("/api", userRoutes);
app.use("/api", pedidosRoutes);
app.use("/api", clientRoutes);
app.use("/api", repartidorRoutes);
app.use("/api", productsRoutes);
app.use("/api", detallesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});



export default app;