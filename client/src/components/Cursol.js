import React from "react";
import "../index.css";
import axios from "axios";

import Card from "./Card";
import Navbar from "./Navbar";
import Addpost from "./Addpost";
import tokken from "./Start";
import {Link} from 'react-router-dom'

class Cursol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postCollection: [],
      authToken: "",
    };
    this.postcard = this.postcard.bind(this);
    
  }

  componentDidMount() {
    if(window.sessionStorage.getItem("token")){
    const tok = window.sessionStorage.getItem("token");
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
    }else{
      this.props.history.push("/")
    }
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



  loadToken() {
    const token = window.sessionStorage.getItem("token");
    this.setState({ authToken: token });
    //console.log("my token>>"+token)
  }

  render() {
    return (
      <div data-dismiss="modal">
        <Navbar profile={window.sessionStorage.getItem("navName")} />
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://newevolutiondesigns.com/images/freebies/hd-wallpaper-1.jpg"
                id="scaledpics"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpaperaccess.com/full/30100.jpg"
                id="scaledpics"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpapershome.com/images/wallpapers/polygon-2560x1440-4k-hd-wallpaper-3d-241.jpg"
                id="scaledpics"
                className="d-block w-100"
                alt="..."
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
        {this.postcard()}
        <div id="addpost">
          <Link type="button" to="/addpost" style={{color:"white"}}>
            <i className="fas fa-plus my-float"></i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Cursol;
