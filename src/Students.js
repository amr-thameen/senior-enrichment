import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'


class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: this.props.students
        }
        this.findSchool = this.findSchool.bind(this)
    }

    componentDidMount(){
        console.log('****', this.props.students)
        this.setState({
            students: this.props.students
        })
    }


    findSchool (schoolId) {
        const schools = this.props.schools
        const school = schools.find(school => school.id === schoolId) 
        return school.name
    }

    render() {
        const students = this.props.students
        
        return (
            <div>
                <br />
                {students.map(student => {
                    return (
                        <div key={student.id}>
                            <h4><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                <Link to={`/schools/${student.schoolId}`}> {student.schoolId ? this.findSchool(student.schoolId) : ''}</Link></h4>
                        </div>
                    )
                })}
                <Link to={'/students/create'}><button className="btn btn-primary">+ Create New Student</button></Link>
            </div>
        )
    }
}

const mapStateToProps = ({ students, schools }) => {
    return {
        students,
        schools
    }
}


export default connect(mapStateToProps)(Students)