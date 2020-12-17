const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [6, 20]
            }
        },
        photo: {
            type: Sequelize.BLOB,
            allowNull: true
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}