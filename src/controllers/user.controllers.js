  import { pool } from "../db.js";
  import jwt, { verify } from "jsonwebtoken";
  import { serialize } from "cookie";

  export const getUser = async (req, res) => {
   
    const user = req.query.username;
    const password = req.query.password;
    console.log(user, password)
    try {
      const [rows] = await pool.query("SELECT * FROM usuarios where nombre = ? and contrasena = ?", [user, password ]);
      console.log(rows)
      rows != [] ? res.json(rows) : res.json(false);
      
    } catch (error) {
      return res.status(500).json({
        message: "Somethin goes wrong",
      });
    }
  };
  export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (username === "alan" && password === "1234") {
      //aqui guardo la variable para devolverla al front
      const token = jwt.sign(
        {
          //estos datos deberian tomarse de la base de datos
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //Tiempo para expirar el token
          username: "alan",
          email: "alan@alan.com",
        },
        "secret"
      ); //esta llave secrete deberia ser una vatiable de entorno

      //serializo el token para  enviarlo al front

      // const serialized = serialize('myTokenName', token,{
      //   //confirguro mi cookie
      //   httpOnly: true,
      //   secure : process.env.NODE_ENV ==='production',
      //   sameSite: 'none',
      //   maxAge: 1000*60*60*24*30,
      //   path: '/'
      // });
      
        //establesco una cookie con el token serializado

      // res.setHeader('Set-Cookie', serialized);
      
      //  console.log(token)

      
      res.cookie('myToken', token, {
        maxAge: 1000*60*60*24*30, // Duración de una hora
        httpOnly: true, // Protocolo http
        secure: process.env.NODE_ENV ==='production', // Conexión segura https
        sameSite: 'lax', // No se enviará en peticiones cross-site
        path: '/'
      });
      

    return res.status(200).json("is Ok") ;
    }
    return res.status(401).json({error:'Invalid'});
  };
  export const getProfile = async (req, res) =>{
    const {myToken} = req.cookies
    if (!myToken) {
      return res.status(401).json({error:'noToken'})
    }


    try {
    const user = jwt.verify(myToken, "secret")
    return res.json({email : user.email, user: user.username})
    } catch (error) {
      res.status(401).json({error:'invalid Token'})
    }
    


  }
  export const deleteProfile = async (req, res) =>{
    const {myToken} = req.cookies


    
    if (!myToken) {
      return res.status(401).json({error:'noToken'})
    }


  try {
    verify(myToken, "secret")  
    res.clearCookie('myToken');
    res.status(200).json('ok')

  } catch (error) {
    return res.status(401).json({error:'InvalidToken'})
  }



  }




  // export const getEmployee = async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
  //       id,
  //     ]);
  //     if (rows.length <= 0)
  //       return res.status(404).json({
  //         message: "Employee not found",
  //       });
  //     res.json(rows[0]);
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Somethin goes wrong",
  //     });
  //   }
  // };

  // export const createEmployees = async (req, res) => {
  //   const { name, salary } = req.body;
  //   try {
  //     const [rows] = await pool.query(
  //       "INSERT INTO employee(name, salary) VALUES (?, ?)",
  //       [name, salary]
  //     );
  //     res.send({
  //       id: rows.insertId,
  //       name,
  //       salary,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Somethin goes wrong",
  //     });
  //   }
  // };
  // export const deleteEmployees = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
  //       id,
  //     ]);
  //     if (result.affectedRows <= 0)
  //       return res.status(404).json({
  //         message: "Employee not found",
  //       });

  //     res.sendStatus(204);
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Somethin goes wrong",
  //     });
  //   }
  // };

  // export const updateEmployees = async (req, res) => {
  //   const { id } = req.params;
  //   const { name, salary } = req.body;
  //   try {
  //     const [result] = await pool.query(
  //       "UPDATE employee SET name= IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
  //       [name, salary, id]
  //     );

  //     if (result.affectedRows === 0)
  //       return res.status(404).json({
  //         message: "Employee not found",
  //       });
  //     const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
  //       id,
  //     ]);
  //     res.json(rows);
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Somethin goes wrong",
  //     });
  //   }
  // };
