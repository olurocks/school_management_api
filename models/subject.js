const { Sequelize, DataTypes } = require('sequelize')

const database = require('../database/db')
const sequelize = database.sequelize

const Class = require("./class")
const ClassSubject = require("./classSubject")

const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "subjects",
    timestamps: false
})

Subject.associate = function (models) {
    Subject.belongsToMany(models.Class, { through: ClassSubject })
}

sequelize.sync()
    .then(() => {
        console.log('Table and columns created successfully');
    })
    .catch((error) => {
        console.error('Error creating table and columns:', error);
    });
module.exports = Subject