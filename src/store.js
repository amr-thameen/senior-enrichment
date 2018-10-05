import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'


//Action Types
const LOAD_SCHOOLS = 'LOAD_SCHOOLS'
const LOAD_STUDENTS = 'LOAD_STUDENTS'
const DELETE_STUDENT = 'DELETE_STUDENT'
const DELETE_SCHOOL = 'DELETE_SCHOOL'
const CREATE_STUDENT = 'CREATE_STUDENT'
const CREATE_SCHOOL = 'CREATE_SCHOOL'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'

//Action Creators
const _loadSchools = (schools) => {
    return {
        type: LOAD_SCHOOLS,
        schools
    }
}

const _loadStudents = (students) => {
    return  {
        type: LOAD_STUDENTS,
        students
    }
}

const _deleteStudent = (student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}

const _deleteSchool = (school) => {
    return {
        type: DELETE_SCHOOL,
        school
    }
}

const _createStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student
    }
}

const _createSchool = (school) => {
    return {
        type: CREATE_SCHOOL,
        school
    }
}

const _updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

const _updateSchool = (school) => {
    return {
        type: UPDATE_SCHOOL,
        school
    }
}


//Thunks
const loadSchools = () => {
    return (dispatch) => {
        return axios.get('/schools')
                    .then((response) => response.data)
                    .then((schools) => dispatch(_loadSchools(schools)))
    }
}

const loadStudents = () => {
    return (dispatch) => {
        return axios.get('/students')
                .then(response => response.data)
                .then(students => dispatch(_loadStudents(students)))
    }
}

const deleteStudent = (student) => {
    return (dispatch) => {
        return axios.delete(`/students/${student.id}`)
                .then(() => dispatch(_deleteStudent(student)))
    }
}

const deleteSchool = (school) => {
    return (dispatch) => {
        return axios.delete(`/schools/${school.id}`)
                .then(() => dispatch(_deleteSchool(school)))
    }
}

const createStudent = (student) => {
    return (dispatch) => {
        return axios.post('/students/create', student)
            .then(response => response.data)
            .then(student => dispatch(_createStudent(student)))
    }
}

const createSchool = (school) => {
    return (dispatch) => {
        return axios.post('/schools/create', school)
                .then(response => response.data)
                .then(school => dispatch(_createSchool(school)))
    }
}

const updateStudent = (student, id) => {
    return (dispatch) => {
        return axios.put(`/student/${id}`, student)
                    .then(response => response.data)
                    .then(student => dispatch(_updateStudent(student)))
    }
}

const updateSchool = (school, id) => {
    return (dispatch) => {
        return axios.put(`/school/${id}`, school)
                    .then(response => response.data)
                    .then(school => dispatch(_updateSchool(school)))
    }
}

//Reducer
const initialState = {
    schools: [],
    students: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCHOOLS:
            state = {schools: action.schools, students: state.students}
            break
        case LOAD_STUDENTS:
            state = {schools: state.schools,students: action.students}
            break
        case DELETE_STUDENT:
            const studentList = state.students.filter(student => student.id !== action.student.id)
            state = {schools: state.schools, students: studentList}
            break
        case DELETE_SCHOOL:
            const schoolList = state.schools.filter(school => school.id !== action.school.id)
            state = {schools: schoolList, students: state.students} 
            break
        case CREATE_STUDENT:
            const studentAdded = [...state.students, action.student]
            state = {schools: state.schools, students: studentAdded}
            console.log(state)
            break
        case CREATE_SCHOOL:
            const schoolAdded = [...state.schools, action.school]
            state = {schools: schoolAdded, students: state.students}
            break
        case UPDATE_STUDENT:
            const updatedStudents = state.students.map(student => {
                if (student.id === action.student.id){
                    return action.student
                } else {
                    return student
                }
            })
            state = {schools: state.schools, students: updatedStudents}
            console.log(state)
            break
        case UPDATE_SCHOOL:
            const updatedSchools = state.schools.map(school => {
                if(school.id === action.school.id){
                    return action.school
                } else {
                    return school
                }
            })
            state = {schools: updatedSchools, students: state.students}
        }
    return state
}


const store = createStore(reducer, applyMiddleware(thunk))

export default store

export {loadSchools, loadStudents, deleteStudent, deleteSchool, createStudent, createSchool, updateStudent, updateSchool}