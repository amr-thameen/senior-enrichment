import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadStudents} from './store'
import {Link} from 'react-router-dom'

class Students extends Component {
    componentDidMount(){
        this.props.loadStudents()
    }
    render(){
        return (
            <div>
            <br/>
            {this.props.students.map(student => {
                return (
                    <div key = {student.id}>
                        <h4><Link to = {`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> <Link to = {`/schools/${student.schoolId}`}>{student.schoolId}</Link></h4>
                    </div>
                )
            })}
            </div>
        )
    }
}

const mapStateToProps = ({students, schools}) => {
    return {
        students,
        schools
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: () => dispatch(loadStudents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)