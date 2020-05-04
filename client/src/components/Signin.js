import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link, Redirect, Route} from 'react-router-dom';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            semail: "",
            spassword: "",
            redirect: false
        }

        this.onChangeSemail = this.onChangeSemail.bind(this);
        this.onChangeSpassword = this.onChangeSpassword.bind(this);
        this.onSignin = this.onSignin.bind(this);
      
    }

    onChangeSemail(e) {
        this.setState({ semail: e.target.value });
      }
    onChangeSpassword(e) {
    this.setState({ spassword: e.target.value });
    }
    onSignin(e) {
    e.preventDefault();


    const signinObject = {
        semail: this.state.semail,
        spassword: this.state.spassword,
    };

    axios
        .post("/users/signin", signinObject)
        .then(async(res) => {
        if(res.data.status == true){
            
        let tokken = res.data.token;
        let navName = res.data.user.firstname;
        let username = res.data.user.username;
        let id = res.data.user.id;

        await window.sessionStorage.setItem("token", tokken);
        await window.sessionStorage.setItem("navName", navName);
        await window.sessionStorage.setItem("username", username);
        await window.sessionStorage.setItem("id", id);
        this.props.history.push("/home");

        } else{
            console.log(res.data.msg)
        }
        })
        .catch((err) => {
        console.log(err);
        });

    this.setState({
        semail: "",
        spassword: "",
    });
    }


    render(){
        return(
            <div>
                <Navbar/>

                <div className="container" style={{paddingTop:"70px", width:"400px"}}>
            <form onSubmit={this.onSignin}>

                <div className="form-group has-success">
                <label className="form-control-label" for="inputSuccess1">Email</label>
                <input type="email" value={this.state.semail} onChange={this.onChangeSemail} placeholder="Email" className="form-control"  id="email" required/>
                </div>

                <div className="form-group has-success">
                <label className="form-control-label">Password</label>
                <input type="password" value={this.state.spassword} onChange={this.onChangeSpassword} placeholder="Password" className="form-control" id="password"required/>
                </div>
                <Link to="/signup" style={{color:"blue"}}>Please register here if are new here</Link>
            <div style={{ paddingTop:"10px"}}>
                <button
                type="submit"
                className="btn btn-success btn-lg"
                data-target="#signup"
                role="button"
              >
                Sign in
              </button> 
              </div>
                </form>
                        
                </div>
        

            </div>
        )
    }
}
export default Signin;