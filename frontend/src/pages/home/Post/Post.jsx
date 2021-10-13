import React from 'react';
import Container from "react-bootstrap/Container";

import './post.css';


const Posts = (props) => {
    return (
        <Container>
            <div className="post">
                <div className="post__top">
                    <img className="user__avatar post__avatar" src="./images/user.png" alt="" />
                    <div className="post__topInfo">
                        <h3>{props.user_id}</h3>
                        <p>{props.title}</p>
                        <p>{props.time_post}</p>
                    </div>
                </div>

                <div className="post__bottom">
                    
                    <img src={props.image} alt={props.title}/>
                    <p>{props.content}</p>
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <i className="far fa-thumbs-up">J'aime</i>

                    </div>
                    <div className="post__option">

                        <i className="far fa-thumbs-down">Je n'aime pas</i>
                    </div>

                    <div className="post__option">
                        <i className="far fa-comments">Commenter</i>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Posts;