const {Sequelize,DataTypes, INTEGER, ENUM} = require('sequelize')

const database  = require('../database/db')
const sequelize = database.sequelize

const ClassSubject = require ("./classSubject")
const ClassTeacher = require("./classTeacher")
const Teacher = require("./teacher")
const Subject = require("./subject")
const Student = require("./student")

const Class = sequelize.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 

    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },

    category: {
        type: DataTypes.ENUM('sciences','art','commercial','technology'),
        allowNull: false
    }
}, {
    tableName: "classes",
    timestamps: false
})

Student.belongsTo(Class, { foreignKey: 'class_id' });
Teacher.belongsToMany(Class, {
    through: ClassTeacher
})
Class.belongsToMany(Subject, { through: ClassSubject })
Class.belongsToMany(Teacher, { through: ClassTeacher })
Class.hasMany(Student, {
    foreignKey: {
        allowNull: false,
        name: 'class_id',
    },
});

module.exports = sequelize.models.Class;
