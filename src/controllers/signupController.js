const {registerUser} = require("../utils/authService")
const User = require("../../models/user")
const auth = require("../authJwt")

async function register(req,res) {
    const userData = new User(req.body);
    try {
        const result = await registerUser(userData);
        const token = auth.generateToken
        await result.save().then(
            res.status(201).send("item saved into the database")
        ).catch (error=>{
            console.log(error)
            res.status(400).send("item not saved")
        })
    } catch (error) {
        console.log(error)
        res.status(401).send(err.message)
    }
}

module.exports = {
    register
};