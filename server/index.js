const express = require('express')
const db = require('./db')
const path = require('path')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())

app.use('/api/', require('./api/index.js'))

const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, '..', 'dist')) )


app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
})

const init = () => {
    db.syncAndSeed()
    app.listen(port, () => {
        console.log(`I am listening to ${port}`)
    })
}

init()