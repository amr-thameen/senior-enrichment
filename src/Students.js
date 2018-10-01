import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadStudents} from './store'


class Students extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: this.props.students
        }
    }

    componentDidMount (){
        this.props.loadStudents()
    }

    render(){
        const students = this.props.students

        return (
            <div>
            <br/>
            {students.map(student => {
                return (
                    <div key = {student.id}>
                        <h4><Link to = {`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>  <Link to = {`/schools/${student.schoolId}`}> {student.schoolId ? student.school.name : ''}</Link></h4>
                    </div>
                )
            })}
            <Link to={'/students/create'}><button className ="btn btn-primary">+ Create New Student</button></Link>
            </div>
        )
    }
}

const mapStateToProps = ({students}) => {
    return {
        students,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: () => dispatch(loadStudents()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Students)