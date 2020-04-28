import React from 'react';
import Navbar from'./Navbar';
import axios from "axios";
import Amzncard from './Amzncard';



class Amazn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            query:"",
            prodCollection:[],
            categoryCollection:[]
        }
        this.showProds = this.showProds.bind(this);
     //this.clickMe= this.clickMe.bind(this);
        this.showCategories = this.showCategories.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:8000/amznprods")
        .then(res=>{
            
                this.setState({
                    categoryCollection: res.data.categoryArr
                })
            })

        axios.get("http://localhost:8000/filter")    
            
        .then(res=>{
            this.setState({
                prodCollection: res.data.resu
            })
            
                  
               })
        
    }
 
    showCategories(){
        function  clickMe(a){
                
            console.log(a)
        }
        return this.state.categoryCollection.map((cats,j)=>{
         
            return(
                <li key={j} class="list-group-item d-flex justify-content-between align-items-center">
                    <a  style={{color:"black", cursor:"pointer"}} id="categoryName" value={cats.categoryName}  onClick={clickMe}>{cats.catergoryName}</a>
                        
                        <span class="badge badge-primary badge-pill">{cats.count}</span>
                        
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

  

    render(){
        return(
            <div>
                <Navbar />
                <div className="row">
                
                <div style={{paddingTop:"70px", paddingLeft:"10px"}}>
                    <ul class="list-group" style={{width:"250px"}}>
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