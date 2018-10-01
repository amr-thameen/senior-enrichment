import React, {Component} from 'react'
import {loadSchools} from './store'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

class Schools extends Component {
    componentDidMount(){
      this.props.loadSchools()  
    }

    render () {
        const students = this.props.students
        return (
            <div>
            <br/>
            {this.props.schools.map(school => {
                return (
                    <div key = {school.id}>
                        <Link to = {`/schools/${school.id}`}><h4>{school.name} {students.filter(student => student.schoolId === school.id).length}</h4></Link>
                    </div>
                )
            })}
            <button className ="btn btn-primary">+ Create New School</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        loadSchools: () => dispatch(loadSchools())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schools)