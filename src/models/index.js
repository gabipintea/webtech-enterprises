const db = require('../config/db')
const User = db.import('./users')
const Group = db.import('./groups')
const Note = db.import('./notes')

module.exports = {
    User,
    Group,
    Note,
    connection: db
}