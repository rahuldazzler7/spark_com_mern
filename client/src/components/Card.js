import React from 'react';
import '../index.css';
import {Link} from 'react-router-dom';



class Card extends React.Component{

  constructor(props){
    super(props)
    this.editAccess =this.editAccess.bind(this)
  }

  editAccess(){
    //console.log("user"+localStorage.getItem("username"))
    //console.log(this.props)
    if (localStorage.getItem("username") == this.props.author){
      return(
        <div className="container" style={{paddingLeft: "550px"}}>
        <Link to={`/edit/${this.props.id}`} >Edit</Link>
      </div>
      )
    }
  }
  
  render(){
    //console.log(localStorage.getItem)
        return(
            <div className="container">

  <div id="cardly">
    <div className="card border-info mb-3" >
      <div className="row no-gutters" >
        <div className="col-md-4" >
          <img src={this.props.imgsrc}  className="card-img" alt="..."></img>
        </div>
        <div className="col-md-8" >
        { this.editAccess()}
         
          
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
           
              <p className="card-text">{this.props.desc}</p>

              <a href="" >continue reading</a>
            
            <p className="card-text"><small className="text-muted">{this.props.time}</small></p>
          </div>
        </div>
      </div>
  </div>
  
</div>

</div>
        )}
    
}

export default Card;