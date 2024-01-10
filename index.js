const connection =require('./connection');
const express= require('express');
const bodyParser = require("body-parser");
 
const app=express();
const port=3000;
//body-parser middleware
app.use(bodyParser.json());
//to resolve cors error 
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/employees', (req, res) => {
    connection.query('select * from employee;',(err,row)=>{
        if(err)
        {
         console.log(err);
        } 
        else
        {
         console.log(row);
         res.send(row);
        }

    })
  })
//get data using employee id
  app.get('/employees/:id', (req, res) => {
    connection.query('select * from employee where employee_id=?;',[req.params.id],(err,row)=>{
        if(err)
        {
         console.log(err);
        } 
        else
        {
         console.log(row);
         res.send(row);
        }
    })
  })
  //delete operation 
  app.delete("/employees/:id",(req,res)=>{

    connection.query("delete from employee where employee_id=?;",[req.params.id],(err,row)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(row);
        }
    })

  })
  //insert row
  app.post("/employees",(req,res)=>{
    var emp=req.body
    var empData = [emp.employee_id, emp.first_name, emp.last_name, emp.job_title, emp.salary, emp.hire_date];
    connection.query("INSERT INTO employee(employee_id,first_name,last_name,job_title,salary,hire_date) VALUES(?)",[empData],(err,row)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(row);
            res.json("successfully inserted.");
        }
    })

  })
  //update data
  //two method 1)patch for specific data update 2)put for all data update

  // app.patch("/employees/:id",(req,res)=>{
  //   var emp=req.body
  //   //var empData = [emp.employee_id, emp.first_name, emp.last_name, emp.job_title, emp.salary, emp.hire_date];
  //   // connection.query("UPDATE employee SET ? WHERE id="+emp.id,[emp],(err,row)=>{
  //     connection.query("UPDATE employee SET ? WHERE employee_id = ?", [req.params.id], (err, row) => { 
  //   if(err)
  //       {
  //           console.log(err);
  //       }
  //       else
  //       {
  //           console.log(row);
  //           res.json(row);
  //       }
  //   })

  // })
  app.patch("/employees/:id", (req, res) => {
    var emp = req.body;
    connection.query("UPDATE employee SET ? WHERE employee_id = ?", [emp, req.params.id], (err, row) => {
        if (err) {
            console.log(err);
          
        } else {
            console.log(row);
            res.json(row);
        }
    });
});
  app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
  })