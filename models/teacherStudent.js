const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/db')
const sequelize = database.sequelize

const Student = require('./student');
const Teacher = require('./teacher');

const TeacherStudent = sequelize.define('TeacherStudent', {
    studentCategory: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    techerCategory: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});




module.exports = TeacherStudent