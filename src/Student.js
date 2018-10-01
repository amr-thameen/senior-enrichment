import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteStudent } from './store'


class Student extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student : this.props.student,
            schools : this.props.schools
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(prevProps){
        if (!prevProps.student && this.props.student) {
            this.setState({
                student: this.props.student,
                schools: this.props.schools
            })
        }
    }

    onSave(ev){
        ev.preventDefault()
    }

    onChange(ev){
        this.setState({
            student: ev.target.value
        })
    }
    
    render() {
        const student = this.state.student
        const school = this.state.schools.find(school => school.id === student.schoolId)
        const filteredschools = this.state.schools.filter(school => school.id !== student.schoolId)
        const {onChange} = this

        return (
            <Fragment>
                <h2>{student ? student.firstName + " " + student.lastName : null}</h2>
                <div>
                    <form>
                        <label>First Name</label>
                        <input value = {student ? student.firstName : ''} onChange = {onChange} name = 'first'></input>
                        <div>
                            <label>Last Name</label>
                            <input value = {student ? student.lastName : ''}></input>
                        </div>
                        <div>
                            <label>GPA</label>
                            <input value = {student ? student.gpa : ''}></input>
                        </div>
                        <div>
                            <label>School</label>
                            <select defaultValue = {school? school.name: null}>
                                <option selected="selected">{school ? school.name : ""}</option>
                                {filteredschools.map(school => {
                                    return (
                                        <option value={school.name} key={school.id}>{school.name}</option>
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

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (student) => dispatch(deleteStudent(student))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)


