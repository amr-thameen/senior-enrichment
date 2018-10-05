import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createStudent} from './store'

class NewStudent extends Component {
    constructor(props){
        super(props)
        this.state = {
                id: 0,
                firstName: '',
                lastName: '',
                gpa: 0,
                schoolId: this.props.school ? this.props.school.id : ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange(ev){
        this.setState({
                [ev.target.name] : ev.target.value
        })
    }

    handleSubmit(ev){
        ev.preventDefault()
        this.props.createStudent(this.state)
        this.props.history.push('/students')
    }

    render() {
        const {onChange, handleSubmit} = this
        const {firstName, lastName, gpa, schoolId} = this.state
        const {schools, params, match, school} = this.props
        console.log(match)
        return (
            <div>
            <h1>{this.state.firstName + ' ' + this.state.lastName}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input value = {firstName} name = 'firstName' onChange={onChange}></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input value = {lastName} name = 'lastName' onChange={onChange}></input>
                </div>
                <div>
                    <label>GPA</label>
                    <input value = {gpa} name = 'gpa' onChange={onChange}></input>
                </div>
                <div>
                    <label>School</label>
                    <select name = 'schoolId' onChange = {onChange} value = {this.state.schoolId}>
                        <option value = ''>None</option>
                        {schools.map(school => {
                            return <option key = {school.id} value = {school.id}> {school.name} </option>
                        })}
                    </select>
                </div>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}

const mapStateToProps = ({schools}, {match, history}) => {
    const id = match.params.id
    const school = schools.find(school => school.id === id*1)
    console.log(school)
    return {
        schools,
        history,
        id,
        school
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudent : (student) => dispatch(createStudent(student))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewStudent)