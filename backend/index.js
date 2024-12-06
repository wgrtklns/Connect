require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')

const PORT = process.env.PORT || 5012
const app = express()

app.use(express.json())
app.use('/api', router)
app.use(express.urlencoded({extended: true}))

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(
            '-----------------------------------------------\n',
            `Server started...\n >>> http://localhost:${PORT}`
        ))
    } catch (e) {
        console.log(e)
    }
}

start() 