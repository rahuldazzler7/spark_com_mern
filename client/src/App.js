import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cursol from "./components/Cursol";
import Card from "./components/Card";
import Start from "./components/Start";
import Protectedroute from "./components/Protectedroute";
import Auth from "./services/Auth";
import Editpost from "./components/Editpost"
import Amazn from "./components/Amazn";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  return (
    <div>
       
      <Router>
        <Switch>
          <Protectedroute path="/" exact component={Start} />
          <Protectedroute path="/home" component={Cursol} />
         
          <Protectedroute path="/edit/:id" component = {Editpost}/>
          <Route path="/amazn" component={Amazn} />
          <Protectedroute path="/signup" component={Signup}/>
          <Protectedroute path="/signin" component={Signin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
