const User = require("../../models/user")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const express = require("express")
const auth = require("../authJwt")
const app = express()

dotenv.config({path: './.env'})
app.use(express.json())


async function login(req, res) {
    const {email, password} = req.body;
    try {

        if(!email || !password) {
            throw new Error("invalid credentials")
        }
        //validate user input
        // await validateUser(req, res, () => {})
        //find user in the database00000000000000000000000000000000000000000000000000000000000
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new Error('user does not exist please use a valid email or signup')
        }
        else if (!user || ! (await bcrypt.compare(password, user.password))){
            throw new Error('incorrect password or pin')
        }

        // Check if email is student or teacher
        const isStudent = email.endsWith('@stu.edu.ng');
        const isTeacher = email.endsWith('@teach.edu.ng');

        if (!isStudent && !isTeacher) {
            throw new Error({ message: 'Invalid email format' });
        }

        // Set user role based on email
        const role = isStudent ? 'student' : 'teacher';

        // Attach role to request object
        req.role = role;

        // Generate JWT for the user
        const token = auth.generateToken(user)
        res.json(`sign in successful, token is : ${token}`)
    } catch (error){
        console.log(error)
        res.status(401).send(error.message);
    }
}

module.exports = {
    login
}