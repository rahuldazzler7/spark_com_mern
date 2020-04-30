import React from "react";
import axios from "axios";
import Navbar from "./Navbar";

class Editpost extends React.Component {
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
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.onDeleteset = this.onDeleteset.bind(this);
    this.confirmdelete = this.confirmdelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `/edit/${this.props.location.pathname.slice(6)}`
      )
      .then((res) => {
        this.setState({
          title: res.data.rposts.title,
          description: res.data.rposts.description,
          type: res.data.rposts.type,
          postimg: res.data.rposts.postimg,
        });
      });
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

  onSubmitEdit(e) {
    e.preventDefault();

    const data = new FormData();

    if (this.state.postimg) {
      data.append("postimg", this.state.postimg, this.state.postimg.name);
      data.append("title", this.state.title);
      data.append("description", this.state.description);
      data.append("type", this.state.type);

      const config = {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      };

      axios
        .patch(
          `/users/edit/${this.props.location.pathname.slice(
            6
          )}`,
          data,
          config
        )
        .then((result) => {
          let a = JSON.stringify(result);
          console.log("here you go >>" + a);
          if (result.data.status == true) {
            console.log(result.data.msg);
            window.location = "/home";
          }
          if (result.data.status == false) {
            console.log(result.data.msg);
          } else {
            console.log("Something went wrog");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onDeleteset(e) {

    axios.delete(
      `/users/delete/${this.props.location.pathname.slice(
        6
      )}`
    ).then(res=>{
      console.log(res);
      window.location="/home";
    })
  }

  confirmdelete(){
    
    var x= window.confirm(`Are you sure you want to remove this post ?` );
    if(x){
        this.onDeleteset();
        return true;
    }
    else{
        return false;
    }
}

  render() {
    return (
      <div>
        <Navbar profile={localStorage.getItem("navName")} />
        <div className="container" style={{ padding: 20 }}>
          <form onSubmit={this.onSubmitEdit}>
            <fieldset>
              <legend>Edit Post</legend>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label for="exampleSelect1">Type</label>
                <select
                  className="form-control"
                  id="type"
                  name="type"
                  value={this.state.type}
                  onChange={this.onChangeType}
                >
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Foods</option>
                  <option>Sports</option>
                  <option>Others</option>>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label></label>
                <img
                  className="card-img rounded-0"
                  src={this.state.postimg}
                  alt=""
                  style={{ padding: 10, height: 200, width: 400 }}
                />
                <input
                  type="file"
                  className="form-control-file"
                  id="postimg"
                  accept="image/*"
                  name="postimg"
                  onChange={this.onChangeImage}
                />
              </div>
              <div style={{ height: 0, width: 0 }}>
                <input
                  type="date"
                  id="updated_on"
                  name="updated_on"
                  style={{ height: 0, width: 0 }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {/* onClick={this.onDeleteset} */}
              <a type="submit" className="btn btn-danger" onClick={this.confirmdelete}  style={{ marginLeft: 10 }}>Delete</a>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Editpost;
