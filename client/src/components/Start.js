import React, { Fragment } from "react";
import {Renderer} from 'react-dom'
import "../index.css";
import Navbar from './Navbar';
import axios from "axios";
import {Link} from 'react-router-dom';
import Card from "./Card";



class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postCollection: [],
    };  
    this.postcard = this.postcard.bind(this);
  }

  componentDidMount(){
    axios
    .get("/home")
    .then((res) => {
      this.setState({ postCollection: res.data.posts });
      console.log(res)
      //console.log("token>>" + sessionStorage.getItem("token"));
      //console.log("name >>" + sessionStorage.getItem("navName"));
      //, {headers: { "x-auth-token": tok.slice(3) },}
    })
    .catch((err) => {
      console.log("something went wrong");
      this.props.history.push("/")
    });
  }

  postcard() {
    return this.state.postCollection.map((posts, i) => {
      //console.log(this.props);
      if (posts.description.length > 100) {
         console.log("Length>>"+posts.description.length)
        return (
         
          <Card
            id={posts._id}
            imgsrc={posts.postimg}
            title={posts.title}
            desc={posts.description.slice(0, 100) + "..."}
            time={posts.timest.slice(0, 10)}
            key={i}
            author={posts.author}
            type={posts.type}
          />
        );
      } else {
       
        return (
          
          <Card
            id={posts._id}
            imgsrc={posts.postimg}
            title={posts.title}
            desc={posts.description}
            time={posts.timest.slice(0, 10)}
            key={i}
            author={posts.author}
            type={posts.type}
          />
        );
      }
    });
  }

render() {
  
    return (
      <div >
        
        <Navbar />
    

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
              <Link
                className="btn btn-primary btn-lg"
                role="button" to="/signup"
              >
                Sign up
              </Link>

              <Link
                className="btn btn-success btn-lg"
                role="button" to="/signin"
                style={{ marginLeft: 10 }}
              >
                Sign in
              </Link>
            </div>
          </p>
        </div>
        <hr/>
        {this.postcard()}
      </div>
    );
  }
}

export default Start;
