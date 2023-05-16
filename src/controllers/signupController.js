const {registerUser} = require("../utils/authService")
const User = require("../../models/user")
const auth = require("../authJwt")

const database = require("../../database/db")
const sequelize = database.sequelize

const Classes = require('../../models/class');
const Student = require('../../models/student')
const Teacher = require('../../models/teacher')
const Subject = require('../../models/subject')
const ClassSubject = require('../../models/classSubject')
const ClassTeacher = require('../../models/classTeacher')

// async function register(req,res) {
//     const userData = new User(req.body);
//     try {
//         const emailDomain = userData.email.split('@')[1];
//         if (emailDomain === 'stu.edu.ng') {
//             userData.role = 'student';
//         } else if (emailDomain === 'teach.edu.ng') {
//             userData.role = 'teacher';
//         } else {
//             throw new Error('Invalid email address');
//         }
//         // console.log(userData)

//         const result = await registerUser(userData);
//         console.log(result)
//         const token = auth.generateToken([userData.role])
//         console.log(token)

//         // extract relevant data from user record and create new student or teacher record
//         if (userData.role === 'student') {
//             const studentData = {
//                 user_id: result.id,
//                 name: userData.name,
//                 email: userData.email
//                 // add any other relevant fields specific to the student model
//             }
//             await Student.create(studentData);
//         } else if (userData.role === 'teacher') {
//             const teacherData = {
//                 name: userData.name,
//                 email: userData.email,
//                 role: userData.role,
//                 user_id: result.id,

//                 // add any other relevant fields specific to the teacher model
//             }
//             await Teacher.create(teacherData);
//         }        
        
//         res.status(201).send("sign-up successful")
        
//     } catch (error) {
//         console.log(error)
//         res.status(401).send(`error occured: ${error.message}`)
//     }
// }



async function register(req, res) {
    const userData = req.body;

    try {
        await sequelize.transaction(async (t) => {
            const emailDomain = userData.email.split('@')[1];
            if (emailDomain === 'stu.edu.ng') {
                userData.role = 'student';
            } else if (emailDomain === 'teach.edu.ng') {
                userData.role = 'teacher';
            } else {
                throw new Error('Invalid email address');
            }

            // const hashedPassword = await hashPassword(userData.password);
            // userData.password = hashedPassword;

            const user = await registerUser(userData, { transaction: t });

            if (userData.role === 'student') {
                const studentData = {
                    user_id: user.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                    // add any other relevant fields specific to the student model
                };
                await Student.create(studentData, { transaction: t });
            } else if (userData.role === 'teacher') {
                const teacherData = {
                    user_id: user.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    // add any other relevant fields specific to the teacher model
                };
                await Teacher.create(teacherData, { transaction: t });
            }
        });

        res.status(201).send('Sign-up successful');
    } catch (error) {
        console.log(error);
        res.status(401).send(`Error occurred: ${error.message}`);
    }
}

module.exports = {
    register
};