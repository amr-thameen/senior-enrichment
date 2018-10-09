import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {deleteSchool, deleteStudent, updateSchool} from './store'
import {Link} from 'react-router-dom'


class School extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: this.props.school ? this.props.school.name : '',
            description: this.props.school ? this.props.school.description : '',
            address: this.props.school ? this.props.school.address : '',
        }

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidUpdate(prevProps){
        if (!prevProps.school && this.props.school) {
            this.setState({
                name : this.props.school.name,
                description : this.props.school.description,
                address: this.props.school.address
            })
        }
    }

    onChange(ev){
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    handleSubmit(ev){
        ev.preventDefault()
        this.props.updateSchool(this.state) 
        this.props.history.push('/schools')
    }

    handleChangeStudent(e){
        this.setState({
            studentId: e.target.value
        })
    }

    render() {
        const school = this.props.school
        const students = this.props.students
        const filteredstudents = students.filter(student => student.schoolId === this.props.match.params.id*1)
        const studentsOutSchool = students.filter(student => student.schoolId !== school.id)
        const {deleteSchool, history, deleteStudent} = this.props
        const {handleSubmit, onChange} = this
        const {name, address, description} = this.state

        return (
            <Fragment>
                <h2>{name ? name : null}</h2>
                <div>
                    <form onSubmit = {handleSubmit}>
                        <label>Name</label>
                        <input value = {name ? name : ''} name = 'name' onChange = {onChange}></input>
                        <div>
                            <label>Description</label>
                            <input value = {description ? description : ''} name = 'description' onChange = {onChange}></input>
                        </div>
                        <div>
                            <label>Address</label>
                            <input value = {address ? address : ''} name = 'address' onChange = {onChange} ></input>
                        </div>
                        <div>
                            <button className="btn btn-success">Save</button>
                            <button className="btn btn-danger" onClick = {() => {
                                deleteSchool(school)
                                history.push('/schools')
                                }}>Delete</button>
                        </div>
                    </form>
                </div>
                <hr id="hr"/>
                <div>
                    <h4>All Students at {school ? school.name : null}</h4>
                    <div>
                        {filteredstudents.map(student => {
                            return (
                                <div id = "flex" key = {student.id}>
                                <h5>{student.firstName} {student.lastName}</h5>
                                <button className="btn btn-danger" onClick = { () => deleteStudent(student)}> X </button>
                                </div>
                            )})}
                    </div>
                {/* <form>
                    <select>
                        {studentsOutSchool.map(student => {
                            return (
                                <option value = {student.id} key = {student.id}> {student.firstName} {student.lastName}</option>
                            )
                        })}
                    </select>
                    <button className="btn btn-success">+ Add Student To School</button>
                </form> */}
                <Link to = {`/students/create/${school ? school.id : ''}`}><button className ="btn btn-primary">+ Create New Student</button></Link>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = ({schools, students}, {match, history}) => {
    const school = schools.find(school => school.id === match.params.id*1)
    return {
        school,
        students,
        match,
        history
    }
}

const mapDispatchToProps = (dispatch, {match}) => {
    return {
        deleteSchool : (school) => dispatch(deleteSchool(school)),
        deleteStudent : (student) => dispatch(deleteStudent(student)),
        updateSchool : (school) => dispatch(updateSchool(school, match.params.id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(School)