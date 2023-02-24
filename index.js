import  express  from "express";
const app = express()


app.get('/employees',(req, res) =>res.send ('Llamando Empleados'))
app.post('/employees',(req, res) =>res.send ('creando empleado'))
app.put('/employees',(req, res) =>res.send ('actualizando empleado'))
app.delete('/employees',(req, res) =>res.send ('Eliminando empleado'))











app.listen(3000)
console.log("escuchando en el puerto 3000")