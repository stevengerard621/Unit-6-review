import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../redux/reducer'
//class component//
class Landing extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = () => {
        axios.post('./api/login', {email: this.state.email,  password: this.state.password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dash')
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <input 
                    maxLength='100'
                    placeholder='Bro Enter an Email'
                    name='email'
                    onChange={(event) => this.handleInput(event)}/>
                <input 
                    type='password'
                    maxLength='20'
                    placeholder='Enter a Password Dude'
                    name='password'
                    onChange={(event) => this.handleInput(event)}/>
                    <button onClick={this.handleLogin}>LOGIN</button>
                <Link to='/register'>Register</Link>
            </div>
        )
    }
}

export default connect(null, {getUser})(Landing);