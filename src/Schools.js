import React, {Component} from 'react'
import {loadSchools} from './store'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

class Schools extends Component {
    constructor(props){
        super(props)
        const {schools} = this.props
        this.state = {
            schools: schools ? schools : null
        }
    }

    render () {
        const students = this.props.students
        const schools = this.props.schools

        return (
            <div>
            <br/>
            {schools.map(school => {
                return (
                    <div key = {school.id}>
                        <Link to = {`/schools/${school.id}`}> <h4> {school.name + ' ' + students.filter(student => student.schoolId === school.id).length} </h4> </Link>
                    </div>
                )
            })}
            <Link to = '/schools/create'><button className ="btn btn-primary">+ Create New School</button></Link>
            </div>
        )
    }
}

const mapStateToProps = ({schools, students}) => {
    return {
        schools,
        students
    }
}


export default connect(mapStateToProps)(Schools)