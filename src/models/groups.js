module.exports = (sequelize, DataTypes) => {
    return sequelize.define('group', {
        users: {
            type: Sequelize.STRING,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
}