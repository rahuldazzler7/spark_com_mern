import React from 'react';

class Amzncard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="">

  <div id="cardly" >
    <div className="card border-info mb-3" >
      <div className="row no-gutters" >
        <div className="col-md-4" style={{height:50}}>
          <img src={this.props.imgsrc}  className="card-img" alt="..."style={{height:120, width:150}} ></img>
        </div>
        <div className="col-md-8" >
         
          
          <div className="card-body" >
            <h5 className="card-title">{this.props.title}</h5>
           
              <p className="card-text">{this.props.Sub}</p>

              <a href={this.props.link} >Click here o vist this on Amazon</a>
            
            <p className="card-text"><small className="text-muted">{this.props.time}</small></p>
          </div>
        </div>
      </div>
  </div>
  
</div>

</div>
        )
    }
}

export default Amzncard;