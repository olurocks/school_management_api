const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const database = require("../database/db")

const sequelize = database.sequelize

const Class = require("./class");
const Subject = require('./subject');


const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('student'),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('sciences', 'arts', 'commercial', 'technology', 'general'),
        allowNull: false
    }
}, {
    tableName: "students",
    timestamps: false,
}
);


module.exports = Student;