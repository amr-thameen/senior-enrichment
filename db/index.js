const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL, { logging: false })

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gpa: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

const School = db.define('school', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Student.belongsTo(School)
School.hasMany(Student)

const syncAndSeed = () => {
    return db.sync({ force : true })
    .then(() => {
        return Promise.all([
            School.create({
                name: 'Middlebury College',
                address: '14 Old Chapel Road',
                description: 'Panthers'
            }),
            School.create({
                name: 'Westminster Choir College',
                address: 'Princeton, New Jersey',
                description: 'Puppies'
            }),
        ])
    })
    .then(([Middlebury, Westminster]) => {
        return Promise.all([
            Student.create({
                firstName: 'Amr',
                lastName: 'Thameen',
                gpa: 3.7
            }),
            Student.create({
                firstName: 'Briana',
                lastName: 'Cangemi',
                gpa: 3.9
            }),
            Student.create({
                firstName: 'Nawras',
                lastName: 'Abureehan',
                gpa: 3.8
            }),
            Student.create({
                firstName: 'Robert',
                lastName: 'Joyce',
                gpa: 3.6
            })
        ])
    })
    .then(([Amr,Briana,Nawras,Robert]) => {
        return Promise.all([
            Amr.setSchool(1),
            Briana.setSchool(2),
            Nawras.setSchool(1)
        ])
    })
}




module.exports = {
    models: {
        Student,
        School
    },
    syncAndSeed
}