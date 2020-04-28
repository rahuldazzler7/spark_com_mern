import React from "react";
import { Redirect } from "react-router-dom";

// class Auth extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       authenticated: false,
//     };
//   }

//   login() {
//     if (localStorage.getItem("token")) {
//       this.setState({
//         authenticated: true,
//       });
//     }
//   }
//   isAuthenticated() {
//     return this.authenticated;
//   }
// }

function Auth() {
  let authenticated = false;
  if (localStorage.getItem("token")) {
    authenticated = true;
  } else {
    authenticated = false;
    return <Redirect to="/" />;
  }
}

export default Auth;
