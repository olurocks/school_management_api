const {Sequelize, DataTypes} = require('sequelize')
const database = require('../database/db')
const sequelize = database.sequelize

const Class = require('../models/class')
const Teacher = require('./teacher')

const ClassTeacher = sequelize.define('ClassTeacher',{
    ClassCategory: {
        type: DataTypes.ENUM('sciences', 'arts', 'commercial', 'technology', 'general'),
        allowNull: false
    },
    TeacherCategory: {
        type:DataTypes.ENUM('sciences', 'arts', 'commercial', 'technology', 'general'),
        allowNull:false
    }
})

async () => {
    await ClassTeacher.sync({ alter: true })
}

module.exports = ClassTeacher