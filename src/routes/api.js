const express = require ("express")
const UserController = require ("../controlers/UserControler.js")
const middleware = require("../middleware/AuthVerify.js")

const app = express.Router();


app.post("/registration" , UserController.registration)
app.post("/login" , UserController.login)
app.post("/profileUpdate",middleware, UserController.profileUpdate)



module.exports = app;