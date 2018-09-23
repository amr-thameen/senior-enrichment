import React from 'react'
import { render } from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './store'
import {HashRouter as Router, Route, Link} from 'react-router-dom'


const root = document.getElementById('root')

render(
    <Provider store = {store}>
        <App/>
    </Provider>
    , root)