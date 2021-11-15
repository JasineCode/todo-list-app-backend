const { db } = require("../config/mysql");
const { UserModel } = require("../models/user");

//register user
exports.addUser = (req, resp) => {

    //fetch data from req
    let newUser = new UserModel(
        "saytama",
        "yamagi",
        "http://assets.stickpng.com/images/58582c01f034562c582205ff.png",
        "ddd",
        "Pass12311"
    )
    //validate data 
    //password
    if (
        newUser.password.length < 8
        || newUser.password.length > 12
    ) {
        resp.send("<h1 style='color:red'>Password Should be at least 8 characters & maximum 12 😅 !!</h1>")
        return
    }
    //username
    if (newUser.username.length < 4 ||
        newUser.username.length > 12) {
        resp.send("<h1 style='color:red'>Username Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return
    }
    //firstname
    if (newUser.firstname.length < 4 ||
        newUser.firstname.length > 12) {
        resp.send("<h1 style='color:red'>FirstName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return
    }
    //lastname
    if (newUser.lastname.length < 4 ||
        newUser.lastname.length > 12) {
        resp.send("<h1 style='color:red'>LastName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return
    }
    //verify if the username already exist 
    db.query(`
           SELECT * FROM USERS 
           WHERE username ='${newUser.username} '    
    `, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ);
            if (resQ.length > 0) {
                resp.send("<h1 style='color:red'> Username Already exist 😅 !!</h1>")
            } else {
                //Insert sql query
                let query = `INSERT INTO USERS SET ?`

                //work with db 
                db.query(query, newUser, (err, resQ) => {
                    if (err) throw err
                    else {
                        console.log(resQ)
                        resp.send("Hello and Welcome " + newUser.firstname + " 😄 !!")
                    }
                })
            }
        }
    })




}