import React from "react";
import axios from "axios";
import "../index.css";

class Addpost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type: "",
      postimg: null,
      
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    //this.onChangeLat = this.onChangeLat.bind(this);
    //this.onChangeLong = this.onChangeLong.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeImage(e) {
    this.setState({ postimg: e.target.files[0] });
  }
  //   onChangeLat() {
  //     console.log("Lat I am working");
  //     if (sessionStorage.getItem("Latitude >>")) {
  //       this.setState({
  //         lat: sessionStorage.getItem("Latitude >>"),
  //       });
  //     } else {
  //       this.setState({
  //         lat: "0",
  //       });
  //     }
  //   }
  //   onChangeLong() {
  //     console.log("Long I am working");
  //     if (sessionStorage.getItem("Longitude >>")) {
  //       this.setState({
  //         lat: sessionStorage.getItem("Longitude >>"),
  //       });
  //     } else {
  //       this.setState({
  //         long: "0",
  //       });
  //     }
  //   }

  onSubmitPost(e) {
    e.preventDefault();

    const data = new FormData();
    
    if (this.state.postimg) {
      data.append("postimg", this.state.postimg, this.state.postimg.name);
      data.append("title",this.state.title);
      data.append("description",this.state.description);
      data.append("type",this.state.type);
      data.append("username", window.sessionStorage.getItem("username"));
      data.append("id", window.sessionStorage.getItem("id"));

      console.log(`Username and pass ${window.sessionStorage.getItem("username")}, ${window.sessionStorage.getItem("id")}`)

      // const postObject = {
      //   title: this.state.title,
      //   description: this.state.description,
      //   type: this.state.type,
      //   postimg: data,
      // };

      const config = {
        headers: {
          "accept": "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      };

      axios
        .post("/users/newpost", data, config)
        .then((result) => {
          let a = JSON.stringify(result);
          console.log("here you go >>" + a);
          if (result.data.status == true) {
            console.log(result.data.msg);
            
            //this.props.history.push("/")
          } 
          if (result.data.status == false) {
            console.log(result.data.msg);
          }
          else {
            console.log("Something went wrog");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

     this.setState({
       title: "",
       description: "",
       type: "",
       postimg: null,
     });
  }

  render() {
    return (
      <div>
        <div id="addpost">
          <a type="button" data-toggle="modal" data-target="#postadd">
            <i className="fas fa-plus my-float"></i>
          </a>
        </div>
        <div
          className="modal"
          id="postadd"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add post
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
                <form onSubmit={this.onSubmitPost} encType="multipart/form-data">
                  <fieldset>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        className="form-control"
                        id="type"
                        value={this.state.type}
                        onChange={this.onChangeType}
                      >
                        <option value="Science & Technology">
                          Science & Technology
                        </option>
                        <option value="Travel">Travel</option>
                        <option value="Foods">Foods</option>
                        <option value="Sports">Sports</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Select Picture</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="postimg"
                        name="postimg"
                        onChange={this.onChangeImage}
                        aria-describedby="fileHelp"
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

export default Addpost;
