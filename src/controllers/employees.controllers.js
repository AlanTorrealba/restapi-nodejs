import { pool } from "../db.js"


export const getEmployees = async (req, res) =>{
    const [rows] = await pool.query('SELECT * FROM employee')
    res.json(rows)

}
export const getEmployee = async (req, res) =>{
    const id = req.params.id
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?',[id])
    if (rows.length <= 0 ) return res.status(404).json({
        message: 'Employee not found'
    })
    res.json(rows[0])
}

export const createEmployees = async (req, res) =>{
    const {name, salary} = req.body
    const [rows] =  await pool.query('INSERT INTO employee(name, salary) VALUES (?, ?)', [name, salary])
    res.send({
        id:rows.insertId,
        name,
        salary
    })
    }
export const deleteEmployees = async (req, res) =>{
    const id = req.params.id
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?',[id])
    if (result.affectedRows <= 0 ) return res.status(404).json({
        message: 'Employee not found'
    })

    res.sendStatus(204)
}




export const updateEmployees = async (req, res) =>{
    const {id} = req.params
    const {name, salary} = req.body

    const [result] = await pool.query('UPDATE employee SET name= ?, salary = ? WHERE id = ?',[name, salary, id])

    console.log(result)
    res.json("recivido")
}