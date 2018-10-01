import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'


class School extends Component {
    constructor(props){
        super(props)
        this.state = {
            school: this.props.school,
            students: this.props.students
        }
    }

    componentDidUpdate(prevProps){
        if (!prevProps.school && this.props.school) {
            this.setState({
                school: this.props.school,
                students: this.props.students
            })
        }
    }

    render() {
        const school = this.state.school
        const students = this.state.students
        const filteredstudents = students.filter(student => student.schoolId === this.props.match.params.id*1)
        const studentsOutSchool = students.filter(student => student.schoolId !== school.id)
        return (
            <Fragment>
                <h2>{school ? school.name : null}</h2>
                <div>
                    <form>
                        <label>Name</label>
                        <input value = {school ? school.name : null}></input>
                        <div>
                            <label>Description</label>
                            <input value = {school ? school.description : null}></input>
                        </div>
                        <div>
                            <label>Address</label>
                            <input value = {school ? school.address : null}></input>
                        </div>
                        <div>
                            <button className="btn btn-success">Save</button>
                            <button className="btn btn-danger" onClick = {() => console.log(school.id)}>Delete</button>
                        </div>
                    </form>
                </div>
                <hr id="hr"/>
                <div>
                    <h4>All Students at {school ? school.name : null}</h4>
                    <div>
                        {filteredstudents.map(student => {
                            return (
                                <div id = "flex">
                                <h5>{student.firstName} {student.lastName}</h5>
                                <button className="btn btn-danger" onClick = { () => console.log(student)}> X </button>
                                </div>
                            )})}
                    </div>
                <form>
                    <select>
                        {studentsOutSchool.map(student => {
                            return (
                                    <option value = {student.firstName}> {student.firstName} {student.lastName}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-success" onClick = { () => {console.log(student.id)}}>+ Add Student To School</button>
                </form>
                <button className ="btn btn-primary">+ Create New Student</button>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = ({schools, students}, {match}) => {
    const school = schools.find(school => school.id === match.params.id*1)
    return {
        school,
        students,
        match
    }
}



export default connect(mapStateToProps)(School)