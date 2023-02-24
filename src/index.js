import  express  from "express";
import {pool} from './db.js';
import employeesRoutes from './routes/employes.routes';
const app = express()


app.get('/ping', async (req, res) =>{
   const [result] =  await pool.query('SELECT 1+1 AS result')
   res.json(result[0])
} )

app.use(employeesRoutes)


app.listen(3000)
console.log("escuchando en el puerto 3000")