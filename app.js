const express = require("express")
const mysql = require("mysql")

//create the connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todosDB'
})

//Connect
db.connect((err) => {
    if (err) throw err
    console.log("Mysql connected...")
})


const app = express()

//Create DB
app.get('/create-todo-db', (req, res) => {

    let sql = 'CREATE DATABASE If NOT EXISTS todoDB';
    db.query(sql, (err, queryRes) => {
        if (err) throw err
        console.log(queryRes);
        res.send('Database Created...')
    })
})

//create the TODOS table
app.get('/create-todo-table', (req, res) => {

    let sql = ` CREATE TABLE TODOS 
                    ( 
                        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                        title VARCHAR(60),
                        status enum('COMPLETED', 'INPROGRESS', 'CANCELED')
                    )`


    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todos table created...')
    })
})

//insert
app.get('/insert-todo-row',(req,res)=>{

    //new todo object
    let todo = {title:"create the database",status:"INPROGRESS"}
    let sql = ` INSERT INTO TODOS SET ? `

    db.query(sql,todo,(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo Row Added ...')
    })
})

//get all todos 
app.get('/get-all-todos',(req,res)=>{

    //sql query
    let sql = ` SELECT * FROM TODOS `

    db.query(sql,(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todos fetched...')
    })
})


//get single todo
app.get('/get-todo-details/:id',(req,res)=>{

    //sql query
    let sql = ` SELECT * FROM TODOS 
                WHERE id= ${req.params.id} `

    db.query(sql,(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo fetched...')
    })
})

//update todo's values
app.get('/update-todo/:id',(req,res)=>{

    //sql query
    let newTitle = "'create todos table'"
    let sql = ` UPDATE TODOS SET title = ${newTitle} WHERE id = ${req.params.id}`

    db.query(sql,(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo '+req.params.id+' title updated...')
    })
})


//delete todo's values
app.get('/delete-todo/:id',(req,res)=>{

    //sql query
    let sql = ` DELETE FROM TODOS WHERE id = ${req.params.id}`

    db.query(sql,(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo '+req.params.id+' deleted...')
    })
})


app.listen('9000', () => {
    console.log('Server started on port 9000 😇');
})