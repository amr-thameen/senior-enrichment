import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

const Nav = ({schools, students}) => {
    return (
        <Fragment>
            <h1 className="text-center">Hey, you have {schools.length} schools and {students.length} students!</h1>
            <br/>
            <Link to = {'/schools'}> <button className ="btn btn-primary btn-lg"> All Schools {schools.length}</button> </Link>
            <Link to = {'/students'}> <button className="btn btn-info btn-lg"> All Students {students.length} </button> </Link>
        </Fragment>
    )
}

const mapStateToProps = ({schools, students}) => {
    return {
        schools,
        students
    }
}


export default connect(mapStateToProps)(Nav)