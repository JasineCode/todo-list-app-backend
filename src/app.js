const express = require("express")
const { API_URL } = require("./config/api")
const { DB } = require("./config/mysql")

//create our app
const app = express()

//enable listening http server
app.listen('9000',(req,resp)=>{
    console.log("Server is runing on port 9000...")
})

//user api
app.get(`${API_URL.user}/all`,(httpReq,httpResp)=>{
    DB.query(`SELECT * FROM USERS`,(err,resQ)=>{
        if(err) throw err
        else {
            console.log(resQ)
            httpResp.send('Users Fetched...')
        }
    })
    
})