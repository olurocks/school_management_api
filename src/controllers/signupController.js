const {registerUser} = require("../utils/authService")
const User = require("../../models/user")
const auth = require("../authJwt")

async function register(req,res) {
    const userData = new User(req.body);
    try {
        const emailDomain = userData.email.split('@')[1];
        if (emailDomain === 'stu.edu.ng') {
            userData.role = 'student';
        } else if (emailDomain === 'teach.edu.ng') {
            userData.role = 'teacher';
        } else {
            throw new Error('Invalid email address');
        }
        console.log(userData)

        const result = await registerUser(userData);
        // console.log(result)
        const token = auth.generateToken([userData.role])
        console.log(token)
        await result.save()
        res.status(201).send("item saved into the database")
        
    } catch (error) {
        console.log(error)
        res.status(401).send(error.message)
    }
}

module.exports = {
    register
};