import React from "react";
import { Route, Redirect } from "react-router-dom";
import Start from "./Start";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.sessionStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return (
            <div>
              <Component {...props}/>
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
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
