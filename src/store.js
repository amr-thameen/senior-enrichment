import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'


//Action Types
const LOAD_SCHOOLS = 'LOAD_SCHOOLS'
const LOAD_STUDENTS = 'LOAD_STUDENTS'

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
    }
    return state
}


const store = createStore(reducer, applyMiddleware(thunk))

export default store

export {loadSchools, loadStudents}