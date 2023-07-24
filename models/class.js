const {Sequelize , DataTypes} = require('sequelize')
const database = require('../database/db')
const Student = require('./student')
const sequelize = database.sequelize

const Class = sequelize.define('Class',{
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

    category: {
        type: DataTypes.ENUM('sciences', 'arts', 'commercial', 'technology', 'general'),
        allowNull: false
    }
}, {
    tableName: "classes",
    timestamps: false
})

async () => {
    await Class.sync({ alter: true })
}
module.exports = Class