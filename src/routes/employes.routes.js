import { router } from "express";

const router = router()


router.get('/employees',(req, res) =>res.send ('Llamando Empleados'))

router.post('/employees',(req, res) =>res.send ('creando empleado'))

router.put('/employees',(req, res) =>res.send ('actualizando empleado'))

router.delete('/employees',(req, res) =>res.send ('Eliminando empleado'))


export default router 