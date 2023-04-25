const express = require('express')
const app = express()
const router = express.Router()
const auth = require("../src/authJwt")
const signup = require("../src/utils/authService")
const { login } = require("../src/controllers/loginController")
const User = require("../models/user")
const validateUser = require('../src/utils/validations/signupValidation')

router.post("/login", async(req,res)=>{
    try {
        await login(req,res)
    } catch (error) {
        console.error(error);
        res.status(401).send(error.message);  
    }
})

router.post("/signup",validateUser, async(req,res) =>{
    try {
        await signup(req,res)
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
})


module.exports = router