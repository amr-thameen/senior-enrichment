import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createSchool} from './store'
import {notify} from 'react-notify-toast'


class NewSchool extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            address: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange(ev){
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    handleSubmit(ev){
        ev.preventDefault()
        this.props.createSchool(this.state)
        let myColor = { background: '#00B32C', text: "#FFFFFF" }
        notify.show("School Created!", "custom", 5000, myColor)
        setTimeout(this.props.history.push('/schools'), 1)
    }

    render(){
        const {name, description, address} = this.state
        const {onChange, handleSubmit} = this

        return (
            <div>
                <h2>{name}</h2>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input name = 'name' value = {name} onChange = {onChange}></input>
                    </div>
                    <div>
                        <label>Description</label>
                        <input name = 'description' value = {description} onChange = {onChange}></input>
                    </div>
                    <div>
                        <label>Address</label>
                        <input name = 'address' value = {address} onChange = {onChange}></input>
                    </div>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({},{history}) => {
    return {
        history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSchool : (school) => dispatch(createSchool(school))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSchool)