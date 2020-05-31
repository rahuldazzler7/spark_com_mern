import React from 'react';


class Comments extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div className="container my-5 py-5 px-md-5 z-depth-1">
                    <section className="text-center text-lg-left dark-grey-text">

                        <div className="text-center font-weight-bold"><span>4</span> comments</div>

                        <div className="media d-block d-md-flex mt-4">
                            <img className="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                            src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg" alt="Generic placeholder image"/>
                            <div className="media-body text-center text-md-left ml-md-3 ml-0">
                            <p className="font-weight-bold my-0">
                                Miley Steward
                                <a href="" className="pull-right ml-1">
                                <i className="fas fa-reply"></i>
                                </a>
                            </p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <div className="media d-block d-md-flex mt-4">
                                <img className="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg" alt="Generic placeholder image"/>
                                <div className="media-body text-center text-md-left ml-md-3 ml-0">
                                <p className="font-weight-bold my-0">
                                    Tommy Smith
                                    <a href="" className="pull-right ml-1">
                                    <i className="fas fa-reply"></i>
                                    </a>
                                </p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque
                                ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </div>
                            </div>

                            
                            <div className="form-group mt-4">
                                <label for="quickReplyFormComment">Your comment</label>
                                <textarea className="form-control" id="quickReplyFormComment" rows="5"></textarea>

                                <div className="text-center my-4">
                                <button className="btn btn-info btn-sm" type="submit">Post</button>
                                </div>
                            </div>

                            <div className="media d-block d-md-flex mt-3">
                                <img className="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                                src="https://mdbootstrap.com/img/Photos/Avatars/img (21).jpg" alt="Generic placeholder image"/>
                                <div className="media-body text-center text-md-left ml-md-3 ml-0">
                                <p className="font-weight-bold my-0">
                                    Sylvester the Cat
                                    <a href="" className="pull-right ml-1">
                                    <i className="fas fa-reply"></i>
                                    </a>
                                </p>
                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                                quia non numquam eius modi
                                tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="media d-block d-md-flex mt-3">
                            <img className="card-img-64 rounded z-depth-1 d-flex mx-auto mb-3"
                            src="https://mdbootstrap.com/img/Photos/Avatars/img (30).jpg" alt="Generic placeholder image"/>
                            <div className="media-body text-center text-md-left ml-md-3 ml-0">
                            <p className="font-weight-bold my-0">
                                Caroline Horwitz
                                <a href="" className="pull-right ml-1">
                                <i className="fas fa-reply"></i>
                                </a>
                            </p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                            deleniti
                            atque corrupti
                            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa
                            officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </div>
                        </div>

                    </section>
                    </div>

            </div>
        )
    }
    
}

export default Comments;