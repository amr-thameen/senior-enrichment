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

app.use(express.static(path.join(__dirname, 'dist')) )


app.get('/schools', (req, res, next) => {
    School.findAll()
    .then((schools) => {
        res.send(schools)
    })
})

app.get('/students', (req, res, next) => {
    Student.findAll({
        include: [
            {model: School}
        ]
    })
    .then((students) => {
        res.send(students)
    })
})

app.delete('/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.destroy())
        .then(() => res.sendStatus(202))
})

app.post('/student/create', (req, res, next) => {
    Student.create(req.body)
        .then(() => res.sendStatus(200))
})


app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'index.html'))
})




// /schools/create 

// /student/create 

// /schools/:id 

// /student/:id 