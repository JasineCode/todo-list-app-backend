const express = require("express")
const { addUser } = require("./api/user")
const { API_URL } = require("./config/api")
const { db } = require("./config/mysql")


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
app.get(`${API_URL.user}/add`,addUser)
