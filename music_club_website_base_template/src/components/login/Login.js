import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToken} from '../../actions/tokenActions'
import './style.css'
import axios from 'axios'
// const bcrypt = require('bcryptjs');

class Login extends Component {

    
    async getToken(username , password){
        const headers = {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const token  = await axios.post('/admin/token' , {
            username : username,
            password : password
        } , {headers : headers})
        //console.log(token.data)
        return token.data
        // .then(res =>{
        //     console.log(res.data)
        //     this.setState({})
        // })
    }
    constructor(props){
        super(props)
        let loggedIn=false
        this.state = {
            username:'',
            password:'',
            loggedIn,
            access_token : null
        }
        this.onChange=this.onChange.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    async submitForm(e){
        e.preventDefault()
        const {username,password} = this.state
        var token = await this.getToken(username,password)
        this.setState({access_token : token})
        console.log('token  from backend is' ,this.state.access_token ?  this.state.access_token.access_token : null)
        
        
        
        if(this.state.access_token){
            
            localStorage.setItem('access_token' , this.state.access_token.access_token)
            console.log("token set in local storage")
            this.setState({
                loggedIn: true
            })
        }
        else
        {
            alert("Oops! You have entered wrong username or password.");
            window.location.reload();
        }
    }
    render() {
            if(this.state.loggedIn)
            {
                return <Redirect to={{
                    pathname : '/admin',
                    state : {token : this.state.access_token}
                }}/>
            }
        return (
            <div id="log">
                <div id="content-box">
                    <h2 id="welcome">Welcome back!</h2>
                    <h4 id="ent">Admin login here</h4>
                    <form id="login" onSubmit={this.submitForm}>
                        <label id="loglabel1" for="adminusername">Username </label>
                        <input type="text" placeholder="Enter username" id="adminusername" name="username" value={this.state.username} onChange={this.onChange} ></input><br/>
                        <label id="loglabel2" for="adminpassword">Password </label>
                        <input type="password" placeholder="Enter password" id="adminpassword" name="password" value={this.state.password} onChange={this.onChange} ></input><br/>
                        <input type="submit" id="login-submit" value="Sign in" />
                    </form>
                </div>
            </div>           
        );
    }
}



export default Login
