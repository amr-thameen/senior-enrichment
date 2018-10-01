import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createStudent} from './store'

class NewStudent extends Component {
    constructor(){
        super()
        this.state = {
                id: 0,
                firstName: '',
                lastName: '',
                gpa: 0,
                school: ''
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
        createStudent(this.state)
        console.log(this.state)
    }

    render() {
        const {onChange, handleSubmit} = this
        const {firstName, lastName, gpa, school} = this.state
        const {schools} = this.props
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
                    {/* <input value = {school} name = 'school' onChange={onChange}></input> */}
                    <select>
                        {schools.map(school => {
                            return  <option key = {school.id}>{school.name}</option>
                        })}
                    </select>
                </div>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}

const mapStateToProps = ({schools}) => {
    return {
        schools
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudent : (student) => dispatch(createStudent(student))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewStudent)