const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeedb'
})

connection.connect((err)=>{
   if(err)
   {
    console.log("error accure ",err);
   } 
   else
   {
    console.log("succesfully connect");
   }
})

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })


module.exports =connection;