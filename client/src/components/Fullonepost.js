import React from 'react';
import '../index.css';
import Navbar from "./Navbar";
import Comments from "./Comments";

class Fullonepost extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Navbar profile={window.sessionStorage.getItem("navName")} />
                <div className="container mt-5">
                    <section className="mx-md-5 dark-grey-text">
                    
                    <div className="row">
                        <div className="col-md-12">
                        <div className="card card-cascade wider reverse">
                        <div className="view view-cascade overlay">
                            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg" alt="Sample image"/>
                            <a href="#!">
                                <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>
                        </div>

                        </div>
                        <div className="card-body card-body-cascade text-center mt-2">
                        <h4 className="font-weight-bold mb-3"><strong>Title of the news</strong></h4>
                        <p className="dark-grey-text">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit
                            quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus
                            et aut officiis cum soluta nobis est eligendi placeat facere aut rerum.</p>
                        
                        <p>by <a className="font-weight-bold">Jessica Clark</a>, 19/04/2018</p>

                        </div>
                    </div>
                    <hr className="my-5"/>
                    </section>
                    </div>

                    

            </div>
        )
    }
    
}

export default Fullonepost;