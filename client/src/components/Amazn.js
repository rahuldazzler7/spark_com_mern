import React from 'react';
import Navbar from'./Navbar';
import axios from "axios";
import Amzncard from './Amzncard';



class Amazn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            query:"",
            searchQuesry:"",
            prodCollection:[],
            categoryCollection:[]
        }
        this.showProds = this.showProds.bind(this);
        this.clickMe= this.clickMe.bind(this);
        this.showCategories = this.showCategories.bind(this);
        this.searchbox = this.searchbox.bind(this);
        this.searching = this.searching.bind(this)
    }

    componentDidMount(){
        console.log("tok >>"+localStorage.getItem("token"))
        axios.get("http://localhost:8000/amznprods")
        .then(res=>{
            
                this.setState({
                    categoryCollection: res.data.categoryArr
                })
            })

        axios.get(`http://localhost:8000/filter?cat=${this.state.query}`)    
            
        .then(res=>{
            this.setState({
                prodCollection: res.data.resu
            })     
               })
        
    }
    clickMe(e){
              this.setState({
                query: e.target.id
              })  
              axios.get(`http://localhost:8000/filter?cat=${this.state.query}`)    
            
              .then(res=>{
                  this.setState({
                      prodCollection: res.data.resu
                  })
                        
                     })
    }
 
    showCategories(){
        
        return this.state.categoryCollection.map((cats,j)=>{
         
            return(
                <li key={j} className="list-group-item d-flex justify-content-between align-items-center">
                    <a  style={{color:"black", cursor:"pointer"}} id={cats.catergoryName} onClick={this.clickMe}>{cats.catergoryName}</a>
                        
                        <span className="badge badge-primary badge-pill">{cats.count}</span>
                        
                    </li>
            )
        })
    }

   

    showProds(){
        
        return this.state.prodCollection.map((prods, i)=>{
            return(
                <Amzncard 
                title={prods.title}
                sub={prods.sub_category}
                imgsrc={prods.img}
                link={prods.product_url}
                time={prods.timest.slice(0, 10)}
                key={i}
                 />
            )
        })
    }

    searching(e){
        this.setState({
            querys:e.target.value
          })
          console.log(e.target.value)
          axios.get(`http://localhost:8000/filter?search=${e.target.value}`)    
                    
          .then(res=>{
            this.setState({
                prodCollection: res.data.prods
            })

            if(!this.state.prodCollection){
                this.setState({
                    prodCollection: []
                })
            }
                    
                 })
        
    }

    searchbox(){
        return(
            <div className="search-box">
            <input
              className="search-txt"
              type="text"
              placeholder="Search"
              value={this.props.search}
              onChange={this.searching}
            ></input>
            <a className="search-btn">
              <i className="fa fa-search"></i>
            </a>
          </div>
        )
    }

  

    render(){
        return(
            <div>
                <Navbar searchbox={this.searchbox()}/>
                <div className="row">
                
                <div style={{paddingTop:"70px", paddingLeft:"10px"}}>
                    <ul className="list-group" style={{width:"250px"}}>
                   {this.showCategories()}
                    </ul>
                </div>
                <div style={{paddingTop:"70px", paddingLeft:"10px"}}>
                {this.showProds()}
                </div>
                
                
                </div>
               
            </div>
            
        )
    }
}

export default Amazn;