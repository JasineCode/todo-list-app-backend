const express = require("express")
const { API_URL } = require("./config/api")
const { DB } = require("./config/mysql")

//create our app
const app = express()

//enable listening http server
app.listen('9000', (req, resp) => {
    console.log("Server is runing on port 9000...")
})

//users/all
app.get(`${API_URL.user}/all`, (httpReq, httpResp) => {
    DB.query(`SELECT * FROM USERS`, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            httpResp.send('Users Fetched...')
        }
    })

})

//users/1/todos/all : toutes les taches de l'utilisateur id=1
app.get(`${API_URL.user}/:userId/todos/all`, (req, resp) => {
    let userId = req.params.userId
    //verifier l'existance de l'utilisateur
    DB.query(`SELECT id FROM USERS WHERE id=${userId}`,
        (err, resQ) => {
            if (err) throw err
            else {
                // console.log(resQ)
                if (resQ.length === 0) {
                    resp.send("<h1 style='color:red'>user not found</h1>")
                } else {

                    let query = `
                        SELECT * FROM TODOS
                        WHERE userId=${userId}
                    `
                    DB.query(query,(err,resQ)=>{
                        if(err) throw err 
                        else{
                            console.log(resQ)
                            resp.send("We have "+resQ.length+" todo,happy coding ^_^ !!")
                        }
                    })
                }
            }
        })


})