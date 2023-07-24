const { Sequelize, DataTypes } = require('sequelize')

const database = require('../database/db')
const sequelize = database.sequelize


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
    },
    category: {
        type: DataTypes.ENUM('sciences','arts', 'commercial', 'technology','general'),
        allowNull: false
    }
}, {
    tableName: "Subjects",
    timestamps: false
})


async () => {
    await Subject.sync({ alter: true })
}


module.exports = Subject