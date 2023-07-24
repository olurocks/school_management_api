const { Sequelize, DataTypes } = require('sequelize');
const database = require("../database/db")

const sequelize = database.sequelize
const Subject = require('./subject');

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
    category: {
        type: DataTypes.ENUM('sciences', 'arts', 'commercial', 'technology', 'general'),
        allowNull: false
    },
    // classes: {
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: false,
    //     defaultValue: []
    // }
    
    },
{
    tableName: "teachers",
    timestamps: false
}
);

// sequelize.sync().then(
//     () => {
//         console.log("Teacher Database and tables are synchronized")
//     }
// ).catch((err) => {
//     console.error("error synchronizing Teacher Database and Tables ")
// })

// async () => {
//     await Teacher.sync({ alter: true })
// }
// (async () => {
//     try {
//         await Teacher.sync({ alter: true });
//         console.log("Teacher Database and tables are synchronized");
//     } catch (err) {
//         console.error("Error synchronizing Teacher Database and Tables:", err);
//     }
// })();

sequelize.sync().then(
    () => {
        console.log("Teacher Database and tables are synchronized")
    }
).catch((err) => {
    console.error("error synchronizing Database and Tables ")
})

module.exports = Teacher;