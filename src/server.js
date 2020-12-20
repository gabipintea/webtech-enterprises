const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const multer = require('multer')
const path = require('path')
const Op = Sequelize.Op
const cors = require('cors')
const { ForeignKeyConstraintError } = require('sequelize')

const sequelize = new Sequelize('webtech_enterprises', 'webtech_enterprises', 'echipadesoc', {
    dialect: 'mysql'
})



app.use(express.static('./public'))

const User = sequelize.define('user', {
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
        type: Sequelize.STRING,
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

const Note = sequelize.define('note', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 25]
        }
    },
    content: {
        type: Sequelize.TEXT,
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

const Group = sequelize.define('group', {
    users: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

//Create database
app.get('/create', async(req, res, next) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//#region USERS
//Users API
app.get('/users', async(req, res, next) => {
    const query = {
        where: {}
    }

    try {
        const users = await User.findAll(query)
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})

app.post('/users', async(req, res, next) => {
    const errors = [];

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        photo: req.body.photo,
        is_admin: req.body.is_admin,
        notes: req.body.notes
    }

    if (!user.username || !user.email || !user.password || (user.is_admin !== true && user.is_admin) !== false || !user.notes) {
        errors.push("Missing data. Please complete all fields!")
    }

    if (!/^[a-zA-Z0-9]+$/.test(user.username)) {
        errors.push("Invalid username!")
    }

    if (!/[a-zA-Z0-9_\.-]+@stud.ase.ro$/.test(user.email)) {
        errors.push("Invalid email!")
    }

    const exists_user = await User.findOne({ where: { username: req.body.username } });
    if (exists_user) {
        errors.push("Username already in use!");
    }

    const exists_email = await User.findOne({ where: { email: req.body.email } });
    if (exists_email) {
        errors.push("Email already in use!");
    }

    // const storage = multer.diskStorage({
    //     destination: './public/user_photos',
    //     filename: function(req, file, cb){
    //         cb(null, )
    //     }
    // })

    if (errors.length === 0) {
        try {
            await User.create(user)
            res.status(201).json({ message: 'created' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "User creation has failed (Server error)" })
        }
    } else {
        res.status(400).send({ errors })
    }

})



app.get('/users/:sid', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.sid)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.put('/users/:sid', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.sid)
        console.log(user)
        if (user) {
            const errors = [];

            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photo: req.body.photo,
                is_admin: req.body.is_admin,
                notes: req.body.notes
            }

            if (!req.body.username) {
<<<<<<< HEAD
                newUser.username = user.dataValues.username
            }

            if (!req.body.email) {
                newUser.email = user.dataValues.email
            }

            if (!req.body.password) {
                newUser.password = user.dataValues.password
            }

            if (!req.body.photo) {
                newUser.photo = user.dataValues.photo
            }

            if (req.body.is_admin !== true && req.body.is_admin !== false) {
                newUser.is_admin = user.dataValues.is_admin
            }

            if (!req.body.notes) {
                newUser.notes = user.dataValues.notes
=======
                newUser.username = user.username
            }

            if (!req.body.email) {
                newUser.email = user.email
            }

            if (!req.body.password) {
                newUser.password = user.password
            }

            if (!req.body.photo) {
                newUser.photo = user.photo
            }

            if (req.body.is_admin !== true && req.body.is_admin !== false) {
                newUser.is_admin = user.is_admin
            }

            if (!req.body.notes) {
                newUser.notes = user.notes
>>>>>>> 6e89b3f5a647de5375fd4e8014a737f374c88109
            }

            if (!/^[a-zA-Z0-9]+$/.test(newUser.username)) {
                errors.push("Invalid username!")
            }

<<<<<<< HEAD
            if (!/[a-zA-Z0-9_\.-]+@stud.ase.ro$/.test(newUser.email)) {
                errors.push("Invalid email!")
            }


            if (req.body.username) {
                const exists_user = await User.findOne({ where: { username: newUser.username } });
                if (exists_user) {
                    errors.push("Username already in use!");
                }
            }

            if (req.body.email) {
                const exists_email = await User.findOne({ where: { email: newUser.email } });
                if (exists_email) {
                    errors.push("Email already in use!");
                }
            }

            if (errors.length === 0) {
                await User.update(newUser, { where: { id: req.params.sid } })
=======
            if (!/[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,5}$/.test(newUser.email)) {
                errors.push("Invalid email!")
            }

            const exists_user = await User.findOne({ where: { username: newUser.username } });
            if (exists_user) {
                errors.push("Username already in use!");
            }

            const exists_email = await User.findOne({ where: { email: newUser.email } });
            if (exists_email) {
                errors.push("Email already in use!");
            }

            if (errors.length === 0) {
                await newUser.update(req.body)
>>>>>>> 6e89b3f5a647de5375fd4e8014a737f374c88109
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(400).send(errors)
            }

        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.delete('/users/:sid', async(req, res, next) => {
        try {
            const user = await User.findByPk(req.params.sid)
            if (user) {
                await user.destroy()
                res.status(202).json({ message: 'deleted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } catch (err) {
            next(err)

        }
    })
    //#endregion USERS

//#region NOTES
//Notes API
app.get('/notes', async(req, res, next) => {
    const query = {
        where: {}
    }
    try {
        const notes = await Note.findAll(query)
        res.status(200).json(notes)
    } catch (err) {
        next(err)
    }
})
app.post('/notes', async(req, res, next) => {
    const errors = [];

    const note = {
        title: req.body.title,
        content: req.body.content,
        notebook: req.body.notebook,
        tags: req.body.tags,
        public: req.body.public,
    }

    if (!note.title || (note.public !== true && note.public !== false)) {
        errors.push("Missing data. Title and privacy are mandatory!")
    }

    if (errors.length === 0) {
        try {
            await Note.create(note)
            res.status(201).json({ message: 'created' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Note creation has failed (Server error)" })
        }
    } else {
        res.status(400).send({ errors })
    }
})

app.get('/notes/:sid', async(req, res, next) => {
    try {
        const note = await Note.findByPk(req.params.sid)
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.put('/notes/:sid', async(req, res, next) => {
    const note = await Note.findByPk(req.params.sid)
    if (note) {


        const newNote = {
            title: req.body.title,
            content: req.body.content,
            notebook: req.body.notebook,
            tags: req.body.tags,
            public: req.body.public,
        }

<<<<<<< HEAD
        if (!req.body.title) {
            newNote.title = note.dataValues.title
        }

        if (!req.body.content) {
            newNote.content = note.dataValues.content
        }

        if (!req.body.notebook) {
            newNote.notebook = note.dataValues.notebook
        }

        if (!req.body.tags) {
            newNote.tags = note.dataValues.tags
        }

        if (req.body.public !== true && req.body.public !== false) {
            newNote.public = note.dataValues.public
        }


        try {
            await Note.update(newNote, { where: { id: req.params.sid } })
            res.status(202).json({ message: 'updated' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Note update has failed (Server error)" })
        }


    } else {
        res.status(404).send({ message: "Note not found" })
    }
})

app.delete('/notes/:sid', async(req, res, next) => {
        try {
            const note = await Note.findByPk(req.params.sid)
            if (note) {
                await note.destroy()
                res.status(202).json({ message: 'deleted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } catch (err) {
            next(err)

        }
    })
    //#endregion NOTES

=======
    }
})
app.delete('/notes/:sid', async(req, res, next) => {
        try {
            const note = await Note.findByPk(req.params.sid)
            if (note) {
                await note.destroy()
                res.status(202).json({ message: 'deleted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        } catch (err) {
            next(err)

        }
    })
    //#endregion NOTES

>>>>>>> 6e89b3f5a647de5375fd4e8014a737f374c88109
//#region GROUPS
//Groups API
app.get('/groups', async(req, res, next) => {
    const query = {
        where: {}
    }
    try {
        const groups = await Group.findAll(query)
        res.status(200).json(groups)
    } catch (err) {
        next(err)
    }
})

app.post('/groups', async(req, res, next) => {
    const errors = [];

    const group = {
        users: req.body.users,
        notes: req.body.notes
    }

    if (!group.users) {
        errors.push("Missing data. Users are needed to define group!")
    }

    if (errors.length === 0) {
        try {
            await Group.create(group)
            res.status(201).json({ message: 'created' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Group creation has failed (Server error)" })
        }
    } else {
        res.status(400).send({ errors })
    }
})

app.get('/groups/:sid', async(req, res, next) => {
    try {
        const group = await Group.findByPk(req.params.sid)
        if (group) {
            res.status(200).json(group)
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

app.put('/groups/:sid', async(req, res, next) => {
    const group = await Group.findByPk(req.params.sid)
    if (group) {

        const newGroup = {
            users: req.body.users,
            notes: req.body.notes
        }

        if (!req.body.users) {
            newGroup.users = group.dataValues.users
        }

        if (!req.body.notes) {
            newGroup.notes = group.dataValues.notes
        }

        try {
            await Group.update(newGroup, { where: { id: req.params.sid } })
            res.status(202).json({ message: 'updated' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Group update has failed (Server error)" })
        }


    }
})

app.delete('/groups/:sid', async(req, res, next) => {
    try {
        const group = await Group.findByPk(req.params.sid)
        if (group) {
            await group.destroy()
            res.status(202).json({ message: 'deleted' })
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)

    }
})

//#endregion GROUPS

app.use((err, req, res, next) => {
        console.warn(err)
        res.status(500).json({ message: 'server error' })
    })
    //#endregion GROUPS




app.listen(8080)