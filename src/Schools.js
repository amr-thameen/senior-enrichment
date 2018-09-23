import React, {Component} from 'react'
import {loadSchools} from './store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Schools extends Component {
    componentDidMount(){
      this.props.loadSchools()  
    }

    render () {
        return (
            <div>
            <br/>
            {this.props.schools.map(school => {
                return (
                    <div key = {school.id}>
                        <Link to = {`/schools/${school.id}`}><h4>{school.name} # students</h4></Link>
                    </div>
                )
            })}
            </div>
        )
    }
}

const mapStateToProps = ({schools}) => {
    return {
        schools
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSchools: () => dispatch(loadSchools())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schools)