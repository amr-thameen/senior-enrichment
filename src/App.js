import React, {Component, Fragment} from 'react'
import {Link} from 'react-router'
import Nav from './Nav'

class App extends Component {
    constructor(){
        super()
    }

    render(){
        return (
            <Fragment>
                <Nav/>
            </Fragment>
        )
    }
}

export default App