const {Sequelize, DataTypes} = require('sequelize')
const Class = require('./class')
const Student = require('./student')
const Subject = require('./subject')
const ClassSubject = require('./classSubject')
const Teacher = require('./teacher')
const TeacherStudent = require('./teacherStudent')
const ClassTeacher = require('./classTeacher')
const { sequelize } = require('../database/db')

Class.hasMany(Student) //foreign key defined in student

Student.belongsTo(Class) //foreign key defined in Student


//class and subject relationship
Class.belongsToMany(Subject, {
    through: ClassSubject
});
Subject.belongsToMany(Class, {
    through: ClassSubject
}); //


//class and teacher relationship
Class.belongsToMany(Teacher, { through: ClassTeacher }) 
Teacher.belongsToMany(Class, { through: ClassTeacher })


//teacher and student relationship
Teacher.belongsToMany(Student, { through: TeacherStudent })
Student.belongsToMany(Teacher, { through: TeacherStudent })


//Teacher and subject relationship
Teacher.hasOne(Subject, {
    foreignKey: "category",
    sourceKey: "category",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"

})

Subject.belongsTo(Teacher, {
    foreignKey: "category",
    targetKey: "category",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"

})



sequelize.sync().then(
    ()=> {
        console.log("Database and tables are synchronized")
    }
).catch((err)=>{
    console.error("error synchronizing Database and Tables ")
})