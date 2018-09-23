const express = require('express')
const db = require('./db')
const School = db.models.School
const Student = db.models.Student
const path = require('path')

db.syncAndSeed()

const app = express()
const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`I am listening to ${port}`)
})

app.use('/dist', express.static(path.join(__dirname, 'dist')) )

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/schools', (req, res, next) => {
    School.findAll()
    .then((schools) => {
        res.send(schools)
    })
})

app.get('/students', (req, res, next) => {
    Student.findAll()
    .then((students) => {
        res.send(students)
    })
})



// /schools/create 

// /student/create 

// /schools/:id 

// /students/:id 