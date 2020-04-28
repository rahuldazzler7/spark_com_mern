import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cursol from "./components/Cursol";
import Card from "./components/Card";
import Start from "./components/Start";
import Protectedroute from "./components/Protectedroute";
import Auth from "./services/Auth";
import Editpost from "./components/Editpost"
import Amazn from "./components/Amazn";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Start} />

          <Protectedroute path="/home" component={Cursol} />
          <Protectedroute path="/edit/:id" component = {Editpost}/>
          <Route path="/Amazn" component={Amazn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
