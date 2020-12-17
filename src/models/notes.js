const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('note', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [3, 25]
            }
        },
        content: {
            type: Sequelize.STRING,
            allowNull: true
        },
        notebook: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tags: {
            type: Sequelize.STRING,
            allowNull: true
        },
        public: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    })
}