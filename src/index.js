import  express  from "express";
import indexrouter from './routes/index.routes.js';
import employeesRoutes from './routes/employees.routes.js';
const app = express()

app.use(express.json())

app.use(indexrouter)
app.use('/api', employeesRoutes)


app.listen(3000)
console.log("escuchando en el puerto 3000")