import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Nav from './Nav'
import Schools from './Schools'
import School from './School'
import Students from './Students'
import Student from './Student'
import { connect } from 'react-redux'
import {loadSchools, loadStudents} from './store'


class App extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.loadSchools()
        this.props.loadStudents()

    }

    render(){
        return (
            <Router>
                <Fragment>
                <Nav/>
                <Route exact path = '/schools' component = { () => <Schools/>}></Route>
                <Route exact path = '/students' component = { () => <Students/>}></Route>
                <Route path = '/schools/:id' component = { () => <School/>}></Route>
                <Route path = '/students/:id' component = { () => <Student/>}></Route>
                </Fragment>
            </Router>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadSchools: () => dispatch(loadSchools()),
        loadStudents: () => dispatch(loadStudents())
    }
}


export default connect(null,mapDispatchToProps)(App)