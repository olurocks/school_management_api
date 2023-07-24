const express =require("express")
const app = express()

app.use(express.json())

const User = require('../../models/user')
const Student = require("../../models/student")
const Teacher = require("../../models/teacher")
const Subject = require("../../models/subject")
const Class = require("../../models/class")

async function getTeacherDetails(req,res) {
    try {
        const details = req.body
        const emailDomain = userData.email.split('@')[1];
        if (emailDomain.toLowerCase() === 'stu.edu.ng') {
            
        }
    } catch(error) {

    }
}

async function getUserDetails(req, res) {
    try {
        const details = req.body;

        const teacher = await Teacher.findOne({ where: { name: details.name, email: details.email } });
        if (!teacher) {
            return res.status(400).send("Teacher not found");
        }

        const students = await Student.findAll({ where: { category: teacher.category } });
        if (students.length === 0) {
            return res.send("No students found with the same category as the teacher");
        }

        const studentNames = students.map((student) => student.name);
        res.send(studentNames);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving user details");
    }
}

module.exports = {
    getUserDetails,
};
