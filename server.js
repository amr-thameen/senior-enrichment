const express = require('express')
const db = require('./db')
const School = db.models.School
const Student = db.models.Student
const path = require('path')
const bodyParser = require('body-parser')

db.syncAndSeed()

const app = express()
const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`I am listening to ${port}`)
})

app.use(express.static(path.join(__dirname, 'dist')) )

app.use(bodyParser.json())

//READING SCHOOLS
app.get('/schools', (req, res, next) => {
    School.findAll()
    .then((schools) => {
        res.send(schools)
    })
})

//READING STUDENTS
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

//DELETING STUDENT
app.delete('/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.destroy())
        .then(() => res.sendStatus(202))
})

//DELETING SCHOOL
app.delete('/schools/:id', (req, res, next) => {
    School.findById(req.params.id)
        .then(school => school.destroy())
        .then(() => res.sendStatus(202))
})

//CREATING STUDENT
app.post('/students/create', (req, res, next) => {
    Student.create(req.body)
        .then((student) => res.status(201).send(student))
})

//CREATING SCHOOL
app.post('/schools/create', (req, res, next) => {
    School.create(req.body)
        .then((school) => res.status(201).send(school)) //what's created? 203 or 204?
})

//UPDATING STUDENT
app.put('/student/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.update(req.body))
        .then(student => res.send(student))
        .catch(err => console.log(err))
})

//UPDATING SCHOOL
app.put('/school/:id' , (req, res, next) => {
    School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school)) 
    .catch(err => console.log(err))
})


app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname,'index.html'))
})
