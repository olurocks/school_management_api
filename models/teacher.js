const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const database = require("../database/db")

const sequelize = database.sequelize

const Class = require("./class")
const Subject = require('./subject')

const classTeacher = require('./classTeacher')

const Teacher = sequelize.define('Teacher', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('teacher'),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: "teachers",
    timestamps: false
}
);


Teacher.belongsTo(Subject)
Subject.hasMany(Teacher)


sequelize.sync()
    .then(() => {
        console.log('Table and columns created successfully');
    })
    .catch((error) => {
        console.error('Error creating table and columns:', error);
    });


module.exports = Teacher;
