const router = require('express').Router()
const db = require('../db')
const School = db.models.School
const Student = db.models.Student


//READING SCHOOLS
router.get('/schools', (req, res, next) => {
    School.findAll()
    .then((schools) => {
        res.send(schools)
    })
})

//READING STUDENTS
router.get('/students', (req, res, next) => {
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
router.delete('/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.destroy())
        .then(() => res.sendStatus(202))
})

//DELETING SCHOOL
router.delete('/schools/:id', (req, res, next) => {
    School.findById(req.params.id)
        .then(school => school.destroy())
        .then(() => res.sendStatus(202))
})

//CREATING STUDENT
router.post('/students/create', (req, res, next) => {
    Student.create(req.body)
        .then((student) => res.status(201).send(student))
})

//CREATING SCHOOL
router.post('/schools/create', (req, res, next) => {
    School.create(req.body)
        .then((school) => res.status(201).send(school)) //what's created? 203 or 204?
})

//UPDATING STUDENT
router.put('/student/:id', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => student.update(req.body))
        .then(student => res.send(student))
        .catch(err => console.log(err))
})

//UPDATING SCHOOL
router.put('/school/:id' , (req, res, next) => {
    School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school)) 
    .catch(err => console.log(err))
})

module.exports = router