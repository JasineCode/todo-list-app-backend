const express = require("express")
const { addTodo } = require("./api/todo")
const { register, login } = require("./api/user")
const { API_URL } = require("./config/api")
const { db } = require("./config/mysql")

const { TaskStatusEnum } = require("./data/enum/TaskStatus")


//Connect
db.connect((err) => {
    if (err) throw err
    console.log("Mysql connected...")
})

const app = express()

app.listen('9000', () => {
    console.log('Server started on port 9000 😇');
})

//user api
app.get(`/${API_URL.user}/register`,register)
app.get(`/${API_URL.user}/login`,login)

//todo api
app.get(`/${API_URL.user}/:userId/${API_URL.todo}/add`,addTodo)
