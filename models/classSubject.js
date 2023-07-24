const {Sequelize, DataTypes} = require('sequelize')

const database = require('../database/db')
const Class = require('./class')
const Subject = require('./subject')
const sequelize = database.sequelize

const ClassSubject = sequelize.define('ClassSubject', {
    ClassCategory: {
        type: DataTypes.ENUM('arts', 'sciences', 'technology', 'commercial'),
        allowNull: false
    },
    SubjectCategory: {
        type: DataTypes.ENUM('arts', 'sciences', 'technology', 'commercial'),
        allowNull: false
    }
})


async () => {
    await ClassSubject.sync({ alter: true })
}


module.exports = ClassSubject