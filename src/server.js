const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize('webtech_enterprises', 'webtech_enterprises', 'echipadesoc', {
    dialect: 'mysql'
})

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

const Note = sequelize.define('note', {
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
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})


//Users API
app.get('/users', async (req, res, next) => {
    const query = {
      where: {}
    }
    // if (req.query.filter) {
    //   query.where.name = {
    //     [Op.like]: `%${req.query.filter}%`
    //   }
    // }
    // let pageSize = 10
    // if (req.query.pageSize) {
    //   pageSize = parseInt(req.query.pageSize)
    // }
    // if (req.query.page) {
    //   const page = parseInt(req.query.page)
    //   query.limit = pageSize
    //   query.offset = page * pageSize
    // }
    try {
      const users = await User.findAll(query)
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
})

app.post('/users', async (req, res, next) => {
    try {
        await User.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

app.get('/users/:sid', async (req, res, next) => {
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

app.put('/users/:sid', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.sid)
        if (user) {
            await user.update(req.body)
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})
app.delete('/users/:sid', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.sid)
        if (user) {
            await user.destroy()
            res.status(202).json({message: 'deleted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})

//Notes API
app.get('/notes', async (req, res, next) => {
    const query = {
      where: {}
    }
    // if (req.query.filter) {
    //   query.where.name = {
    //     [Op.like]: `%${req.query.filter}%`
    //   }
    // }
    // let pageSize = 10
    // if (req.query.pageSize) {
    //   pageSize = parseInt(req.query.pageSize)
    // }
    // if (req.query.page) {
    //   const page = parseInt(req.query.page)
    //   query.limit = pageSize
    //   query.offset = page * pageSize
    // }
    try {
      const notes = await Note.findAll(query)
      res.status(200).json(notes)
    } catch (err) {
      next(err)
    }
})
app.post('/notes', async (req, res, next) => {
    try {
        await Note.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

app.get('/notes/:sid', async (req, res, next) => {
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

app.put('/notes/:sid', async (req, res, next) => {
    try {
        const note = await Note.findByPk(req.params.sid)
        if (note) {
            await note.update(req.body)
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})
app.delete('/notes/:sid', async (req, res, next) => {
    try {
        const note = await Note.findByPk(req.params.sid)
        if (note) {
            await note.destroy()
            res.status(202).json({message: 'deleted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})

//Groups API
app.get('/groups', async (req, res, next) => {
    const query = {
      where: {}
    }
    // if (req.query.filter) {
    //   query.where.name = {
    //     [Op.like]: `%${req.query.filter}%`
    //   }
    // }
    // let pageSize = 10
    // if (req.query.pageSize) {
    //   pageSize = parseInt(req.query.pageSize)
    // }
    // if (req.query.page) {
    //   const page = parseInt(req.query.page)
    //   query.limit = pageSize
    //   query.offset = page * pageSize
    // }
    try {
      const groups = await Group.findAll(query)
      res.status(200).json(groups)
    } catch (err) {
      next(err)
    }
})

app.post('/groups', async (req, res, next) => {
    try {
        await Group.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

app.get('/groups/:sid', async (req, res, next) => {
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

app.put('/groups/:sid', async (req, res, next) => {
    try {
        const group = await Group.findByPk(req.params.sid)
        if (group) {
            await group.update(req.body)
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})
app.delete('/groups/:sid', async (req, res, next) => {
    try {
        const group = await Group.findByPk(req.params.sid)
        if (group) {
            await group.destroy()
            res.status(202).json({message: 'deleted'})
        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        next(err)
        
    }
})


app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

app.listen(8080)