const express = require('express')
const app = express()
const router = express.Router()
const auth = require("../src/authJwt")
const { register } = require("../src/controllers/signupController")
const { login } = require("../src/controllers/loginController")
const User = require("../models/user")
const validateUser = require('../src/utils/validations/signupValidation')
const {getUserDetails} = require ('../src/controllers/getDetailsController')

require('../models/associations')

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
        await register(req,res)
    } catch (error) {
        // console.log(error)
    }
})

// GET student details
router.get('/details', auth.verifyToken, async (req, res) => {
    try {
        await getUserDetails(req,res)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});












router.get("/dashboard",auth.verifyToken, async(req,res)=>{
    const sch_member = req.decoded.user
    // console.log(sch_member)
    const user_role = sch_member.role
    console.log(user_role)


    const user = await User.findOne({where:{
        role: user_role
    }})
    if(!user) {
        return(res.status(404).send("user not found"));
    }
    if(user.role === "student") {
        return(res.status("user is a student"))
    } else if(user.role === "teacher") {
        return(res.status(200).send("user is a teacher"))
    }
})
module.exports = router