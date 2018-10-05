import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteStudent , updateStudent } from './store'


class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
                firstName : '',
                lastName : '',
                gpa : 0,
                schoolId : null,
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (this.props.student){
            this.setStudent(this.props.student)
        }
    }

    setStudent(student){
        const {firstName, lastName, gpa, schoolId} = this.props.student
        this.setState({
            firstName,
            lastName,
            gpa,
            schoolId
        })
    }

    componentDidUpdate(prevProps){
        if (!prevProps.student && this.props.student) {
            this.setStudent(this.props.student)
        }
    }

    handleSubmit(ev){
        ev.preventDefault()
        this.props.updateStudent(this.state)
        this.props.history.push('/students')
    }

    onChange(ev){
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }
    
    render() {
        const {firstName, lastName, gpa, schoolId} = this.state
        const student = this.props.student
        const school = this.props.schools.find(school => school.id === schoolId)
        const filteredschools = this.props.schools.filter(school => school.id !== schoolId)
        const {onChange, handleSubmit} = this
        console.log(this.state)
        return (
            <Fragment>
                <h2>{firstName + " " + lastName}</h2>
                <div>
                    <form onSubmit = {handleSubmit}>
                        <label>First Name</label>
                        <input value = {firstName ? firstName : ''} onChange = {onChange} name = 'firstName'></input>
                        <div>
                            <label>Last Name</label>
                            <input value = {lastName ? lastName : ''} onChange = {onChange} name = 'lastName'></input>
                        </div>
                        <div>
                            <label>GPA</label>
                            <input value = {gpa ? gpa : ''} onChange = {onChange} name = 'gpa'></input>
                        </div>
                        <div>
                            <label>School</label>
                            <select defaultValue = {school? school.name: null} onChange = {onChange} name = 'schoolId'>
                                <option selected="selected">{school ? school.name : ""}</option>
                                {filteredschools.map(school => {
                                    return (
                                        <option value={school.id} key={school.id}>{school.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                    <button className="btn btn-danger" onClick={() => {
                        this.props.deleteStudent(student)
                        this.props.history.push('/students')
                        }}>Delete</button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({students, schools}, {match, history}) => {
    const student = students.find(student => student.id === match.params.id*1)
    return {
        student,
        schools,
        history
    }
}

const mapDispatchToProps = (dispatch, { match }) => {
    return {
        deleteStudent: (student) => dispatch(deleteStudent(student)),
        updateStudent: (student) => dispatch(updateStudent(student, match.params.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)


