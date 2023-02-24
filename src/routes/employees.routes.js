import { Router } from "express";
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee } from "../controllers/employees.controllers.js";
const router = Router()


router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)


router.post('/employees',createEmployees)

router.patch('/employee/:id',updateEmployees)

router.delete('/employees/:id',deleteEmployees)


export default router 