import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Nav from './Nav'
import Schools from './Schools'
import School from './School'
import Students from './Students'
import Student from './Student'
import NewStudent from './NewStudent'
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
                <div>
                <Nav/>
                <Route exact path = '/schools' component = { () => <Schools/>}/>
                <Route exact path = '/students' component = { () => <Students/>}/>
                <Route path = '/schools/:id' component = {School}/>
                <Switch>
                <Route path = '/students/create' component = { () => <NewStudent/>}/>
                <Route path = '/students/:id' component = {Student}/>
                </Switch>
                <Route path = '/schools/create' component = { () => <School/>}/>
                </div>
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