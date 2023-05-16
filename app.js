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

// Define models
const classes = require('./models/class');
const student = require('./models/student')
const teacher = require('./models/teacher')
const subject = require('./models/subject')
const classSubject = require('./models/classSubject')
const classTeacher = require('./models/classTeacher')




const Teacher = new teacher(sequelize, Sequelize);
const Class = new classes(sequelize, Sequelize);
const Subject = new subject(sequelize, Sequelize);
const ClassSubject = new classSubject(sequelize, Sequelize)
const ClassTeacher = new classTeacher(sequelize, Sequelize)
const Student = new student(sequelize, Sequelize);



// Create database tables
sequelize.sync();


const port = 5000
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})