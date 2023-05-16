const {Sequelize, DataTypes} = require("sequelize")
const database = require("../database/db")

const sequelize = database.sequelize

const ClassTeacher = sequelize.define( "ClassTeacher",{
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        }
}, {
    timestamps: false,
    tableName: "class_teacher"
}
)

module.exports = ClassTeacher