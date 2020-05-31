import React from 'react';
import '../index.css';
import {Link} from 'react-router-dom';



class Card extends React.Component{

  constructor(props){
    super(props)
    this.editAccess =this.editAccess.bind(this)
  }

  editAccess(){
    //console.log("user"+sessionStorage.getItem("username"))
    //console.log(this.props)
    if (window.sessionStorage.getItem("username") == this.props.author){
      return(
        <div className="container" style={{paddingLeft: "550px"}}>
        <Link class="btn btn-success btn-md btn-rounded mx-0" to={`/edit/${this.props.id}`} >Edit</Link>
      </div>
      )
    }
  }
  
  render(){
    //console.log(sessionStorage.getItem)
        return(
            <div>
                 <div class="container mt-5">
                  <section class="dark-grey-text">
                    <div class="row align-items-center">
                      <div class="col-lg-5">
                        <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                          <img class="img-fluid" src={this.props.imgsrc} alt="Sample image"/>
                          <a>
                            <div class="mask rgba-white-slight"></div>
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-7">
                        <a href="#!" class="green-text">
                          <h6 class="font-weight-bold mb-3"><i class="fas fa-utensils pr-2"></i>{this.props.type}</h6>
                        </a>
                        
                        <h4 class="font-weight-bold mb-3"><strong>{this.props.title}</strong></h4>
                      
                        <p>{this.props.desc}</p>
                        
                        <p>by <a><strong>{this.props.author}</strong></a>, {this.props.time}</p>
                        { this.editAccess()}
                        <a class="btn btn-success btn-md btn-rounded mx-0">Read more</a>
                      </div>
                    </div>
                    <hr class="my-5"/> 
                  </section>
                  </div>
            </div>
        )}
    
}

export default Card;