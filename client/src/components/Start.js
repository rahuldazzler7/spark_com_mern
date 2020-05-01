import React, { Fragment } from "react";
import "../index.css";
import axios from "axios";
import Navbar from './Navbar';
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";


class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      semail: "",
      spassword: "",
      lng:"",
      lat:""
    };
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangepassword2 = this.onChangepassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeSemail = this.onChangeSemail.bind(this);
    this.onChangeSpassword = this.onChangeSpassword.bind(this);
    this.onSignin = this.onSignin.bind(this);
    this.geolocation = this.geolocation.bind(this);
  }

  geolocation() {
    if ("geolocation" in navigator) {
      console.log("geolocation available");

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        await Cookie.set("Latitude >>", lat);
        await Cookie.set("Longitude >>", long);
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
      lng: Cookie.get("Longitude >>"),
      lat: Cookie.get("Latitude >>")
    };
    axios
      .post("/users/signup", signUpObject)
      .then((res) => {
        //window.location = "/";
        if (res.data.status == true) {
          console.log(res.data.msg);
        }
        if (res.data.status == false) {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    });
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

        await Cookie.set("token", tokken);
        await Cookie.set("navName", navName);
        await Cookie.set("username", username);
        await Cookie.set("id", id);
        
        this.props.history.push("/home")
        //console.log(Cookie.get("token"))
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
  isAuthenticated() {
    return this.authenticated;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ width: 0, height: 0 }}>{this.geolocation()}</div>

        {/* jumbotron */}
        <div className="jumbotron text-center">
          <h1 className="display-3">Welcome to Rahul's Arena!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classNamees for typography and spacing to space
            content out within the larger container.
          </p>
          <p className="lead">
            <div>
              <button
                className="btn btn-primary btn-lg"
                data-toggle="modal"
                data-target="#signup"
                role="button"
              >
                Sign up
              </button>

              <button
                className="btn btn-success btn-lg"
                data-toggle="modal"
                data-target="#signin"
                role="button"
                style={{ marginLeft: 10 }}
              >
                Signin
              </button>
            </div>
          </p>
        </div>

        {/* <!--Signup-->> */}
        <div
          className="modal fade"
          id="signup"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sign up
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <fieldset>
                    <div className="form-group">
                      <label>First name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={this.state.firstname}
                        onChange={this.onChangefirstname}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={this.state.lastname}
                        onChange={this.onChangelastname}
                        placeholder="Last name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={this.state.username}
                        onChange={this.onChangeusername}
                        placeholder="Username"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={this.state.email}
                        onChange={this.onChangeemail}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={this.state.password}
                        onChange={this.onChangepassword}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label> Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        value={this.state.password2}
                        onChange={this.onChangepassword2}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Signin-->> */}
        <div
          className="modal fade"
          id="signin"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sign In
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSignin}>
                  <fieldset>
                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={this.state.semail}
                        onChange={this.onChangeSemail}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={this.state.spa}
                        onChange={this.onChangeSpassword}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Start;
