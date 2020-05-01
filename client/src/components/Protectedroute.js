import React from "react";
import { Route, Redirect } from "react-router-dom";
import Start from "./Start";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.sessionStorage.getItem("token")) {
          return (<div>
              <Component {...props} />
              <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location[0],
                },
              }}
            />
          </div>)
        } else {
          return (
            <div>
              <Component {...props}/>
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location[0],
                },
              }}
            />
            </div>
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
