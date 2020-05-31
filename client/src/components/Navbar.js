import React from "react";
import "../App.css";
import {Link} from 'react-router-dom';


class Navbar extends React.Component {

  constructor(props){
    super(props)
    this.state={
      querys:""
    }
    //this.myFunction = this.myFunction.bind(this);
    this.signout = this.signout.bind(this);
    this.loginOptions =this.loginOptions.bind(this);
  }
  // const styles = {
  //     position: "fixed",
  //     top: 0,
  //     zIndex: 10,
  // }
  
 loginOptions(){
  if(this.props.profile){

    
      return(
        <div className="nav-item dropdown" style={{paddingRight:"20px"}}>
        <div >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.profile}
            </a>
            <div
              className="dropdown-menu"
              id="myDropdownprof"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/signout">
                Some future
              </a>
              <a className="dropdown-item" href="/games/flappybird">
                Games
              </a>
              <div className="dropdown-divider"></div>
              <p className="dropdown-item" onClick={this.signout}> 
                Signout
              </p>
            </div>
        </div>
        </div>
      )
  }
 }

  signout(e) {
  window.sessionStorage.clear("navName","username","id","token")
  window.location = "/";
}

  // signout() {
  //   sessionStorage.clear();
  //   window.location = "/";
  // }
  render(){
    window.onclick = function (event) {
      if (!event.target.matches(".nav-link dropdown-toggle")) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
    function myFunction() {
    console.log("show")
      document.getElementById("myDropdown").classList.toggle("show");
    }
  return (
    <div>
      <section id="nav-bar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <button className="search-btn">
            {" "}
            <i className="fas fa-align-justify"></i>{" "}
          </button>

          <a className="navbar-brand" href="/">Sparkrs</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">Home</Link>
                
              </li>
              <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <div
              className="dropdown-menu"
              id="myDropdown"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/amazn">
                Amazon's Products
              </a>
              <a className="dropdown-item" href="/games/flappybird">
                Flipkart's Products
              </a>
            </div>
          </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <div>{this.props.searchbox}</div>
          <div>{this.loginOptions()}</div>
          </div>

           
          
        </nav>
      </section>
    </div>
  )};
}

export default Navbar;
