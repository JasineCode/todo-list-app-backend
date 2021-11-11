const express = require("express")
const mysql = require("mysql")

//create the connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoDB'
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



//get all todos 
app.get('/get-all-todos', (req, res) => {

    //sql query
    let sql = ` SELECT * FROM TODOS `

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todos fetched...')
    })
})


//get single todo
app.get('/get-todo-details/:id', (req, res) => {

    //sql query
    let sql = ` SELECT * FROM TODOS 
                WHERE id= ${req.params.id} `

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo fetched...')
    })
})

//put todo ( edit todo )
app.get('/todos/put/:id', (req, res) => {

    //sql query
    let updatedTodo = { title: "updated Title", status: "CANCELED" }

    let sql = ` UPDATE TODOS 
                SET title = '${updatedTodo.title}', 
                    status = '${updatedTodo.status}' 
                WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo ' + req.params.id + ' title updated...')
    })
})


//patch for todo's status
app.get('/todos/patch/:id', (req, res) => {

    //sql query
    let updatedStatus = "COMPLETED"

    let sql = ` UPDATE TODOS 
                SET status = '${updatedStatus}' 
                WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo ' + req.params.id + ' status updated...')
    })
})



//delete todo's values
app.get('/delete-todo/:id', (req, res) => {

    //sql query
    let sql = ` DELETE FROM TODOS WHERE id = ${req.params.id}`

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Todo ' + req.params.id + ' deleted...')
    })
})

//filter todos by title
app.get("/todos/:title", (req, resp) => {

    // create query
    let query = ` SELECT * 
                  FROM TODOS 
                  WHERE title LIKE '%${req.params.title}%' `

    //execrute the query              
    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result)
        resp.send("data filtred...")
    })

})

// add user
app.get("/users/add", (req, resp) => {
    
    let newUser = {
        username: "yassine.rassy1@gmail.com",
        password: 'pass123',
        firstname: "yassine",
        lastname: "saytama",
        avatar_url: "http://assets.stickpng.com/images/58582c01f034562c582205ff.png",
    }
    let query = `INSERT INTO USERS SET ? `

    db.query(query, newUser, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ);
            resp.send("User Created...")
        }
    })
})
//creer une tache pour un utilisateur 
app.get('/users/:userId/todos/add', (req, res) => {

    //new todo object
    let todo = {
        title: "task 1",
        status: "INPROGRESS",
        userId: req.params.userId
    }
    let sql = ` INSERT INTO TODOS SET ? `

    db.query(sql, todo, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Task Added for the user '+req.params.userId)
    })
})



app.listen('9000', () => {
    console.log('Server started on port 9000 😇');
})