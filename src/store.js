import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'


//Action Types
const LOAD_SCHOOLS = 'LOAD_SCHOOLS'
const LOAD_STUDENTS = 'LOAD_STUDENTS'
const DELETE_STUDENT = 'DELETE_STUDENT'
const CREATE_STUDENT = 'CREATE_STUDENT'

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

const _createStudent = (student) => {
    return {
        type: CREATE_STUDENT,
        student
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

const createStudent = (student) => {
    return (dispatch) => {
        return axios.post('/student/create', student)
            .then(response => response.data)
            .then(student => dispatch(_createStudent(student)))
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
        case CREATE_STUDENT:
            const studentAdded = [...state.students, action.student]
            state = {schools: state.schools, students: studentAdded}
            console.log(state)
            break
    }
    return state
}


const store = createStore(reducer, applyMiddleware(thunk))

export default store

export {loadSchools, loadStudents, deleteStudent, createStudent}