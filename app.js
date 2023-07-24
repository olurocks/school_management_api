require('./models/associations')
const express = require('express')
const {connectToDatabase} =  require('./database/db')
const { sequelize } = require('./database/db')

const authRoutes  = require("./routes/authRoutes")

const app = express()



require('dotenv').config({path: "./env"})
app.use(express.json())
app.use('/auth', authRoutes)


const { Sequelize } = require('sequelize');
const db = require('./database/db');

// Initialize Sequelize instance
async () =>{
    await connectToDatabase()
}
sequelize.sync();


const port = 5000
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})