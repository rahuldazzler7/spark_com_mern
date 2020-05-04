import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            password2: "",
            lng:"",
            lat:""
        }
        this.onChangefirstname = this.onChangefirstname.bind(this);
        this.onChangelastname = this.onChangelastname.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangepassword2 = this.onChangepassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.geolocation = this.geolocation.bind(this);
    }

    geolocation() {
        if ("geolocation" in navigator) {
          console.log("geolocation available");
    
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
    
            await window.sessionStorage.setItem("Latitude >>", lat);
            await window.sessionStorage.setItem("Longitude >>", long);
          });
        } else {
          console.log("geolocation is not available");
        }
      }
    
      onChangefirstname(e) {
        this.setState({ firstname: e.target.value });
      }
      onChangelastname(e) {
        this.setState({ lastname: e.target.value });
      }
      onChangeusername(e) {
        this.setState({ username: e.target.value });
      }
      onChangeemail(e) {
        this.setState({ email: e.target.value });
      }
      onChangepassword(e) {
        this.setState({ password: e.target.value });
      }
      onChangepassword2(e) {
        this.setState({ password2: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();
    
        const signUpObject = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          lng: window.sessionStorage.getItem("Longitude >>"),
          lat: window.sessionStorage.getItem("Latitude >>")
        };
        axios
          .post("/users/signup", signUpObject)
          .then((res) => {
            
            if (res.data.status == true) {
              console.log(res.data.msg);
              this.props.history.push("/")
            }
            if (res.data.status == false) {
              console.log(res.data.msg);
            }
            
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({
          firstname: "firstname",
          lastname: "",
          username: "",
          email: "",
          password: "",
          password2: "",
        });
      }

    render(){
        return(
            <div>
                <Navbar/>
                <div style={{ width: 0, height: 0 }}>{this.geolocation()}</div>

        

                <div className="container" style={{paddingTop:"70px", width:"400px"}}>
            <form onSubmit={this.onSubmit}>
                <div className="form-group has-success">
                <label className="form-control-label">First Name</label>
                <input type="text" value={this.state.firstname} onChange={this.onChangefirstname} placeholder="First name" className="form-control"  id="firstname" required/>
                </div>

                <div className="form-group has-success">
                <label className="form-control-label">Last Name</label>
                <input type="text" value={this.state.lastname} onChange={this.onChangelastname}  placeholder="Last name" className="form-control"  id="lastname" required/>
                
                </div>

                <div className="form-group has-success">
                <label className="form-control-label" for="inputSuccess1">Email</label>
                <input type="email" value={this.state.email} onChange={this.onChangeemail} placeholder="Email" className="form-control"  id="email" required/>
                
                </div>

                <div className="form-group has-success">
                <label className="form-control-label">Username</label>
                <input type="text" value={this.state.username} onChange={this.onChangeusername} placeholder="Username" className="form-control" id="username" required/>
                
                </div>

                <div className="form-group has-success">
                <label className="form-control-label">Password</label>
                <input type="password" value={this.state.password} onChange={this.onChangepassword} placeholder="Password" className="form-control" id="password" required/>
                
                </div>

                <div className="form-group has-danger">
                <label className="form-control-label" for="inputDanger1">Confirm Password</label>
                <input type="password" value={this.state.password2} onChange={this.onChangepassword2} placeholder="password" className="form-control" id="password2" required/>
                </div>
                <Link to="/signin" style={{color:"blue"}}>Please sign in here if are already an exsisting user</Link>
            <div style={{ paddingTop:"10px"}}>
                <button
                type="submit"
                className="btn btn-primary btn-lg"
                data-target="#signup"
                role="button"
              >
                Sign up
              </button> 
              </div>
                </form>
                        
                </div>
        

            </div>
        )
    }
}
export default Signup;