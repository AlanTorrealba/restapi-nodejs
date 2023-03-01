import express from "express";
import indexrouter from "./routes/index.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import  { PORT } from './config.js'




const app = express();

app.use(express.json());

app.use(indexrouter);
app.use("/api", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});



export default app;