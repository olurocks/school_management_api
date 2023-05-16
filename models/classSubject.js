const { Sequelize, DataTypes} = require("sequelize")
const database = require("../database/db")
const sequelize = database.sequelize


const ClassSubject = sequelize.define("ClassSubject", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }
},{
    tableName: "class_subject",
    timestamps: false
})

module.exports = ClassSubject