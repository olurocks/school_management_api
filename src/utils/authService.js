const User = require("../../models/user")
const { hashPassword } = require("./authUtils")

async function registerUser(userData) {
    try {
        const hashedPassword = await hashPassword(userData.password)
        const user = new User({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        })
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
}