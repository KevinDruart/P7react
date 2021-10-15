import React from 'react';
import Container from "react-bootstrap/Container";

import './post.css';


const Posts = (props) => {

    const datePost = new Date(props.time_post);
    let postTime = datePost.toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    return (
        <Container className="Post">
            <div className="post">
                <div className="post__top">
                    <img className="user__avatar post__avatar" src="./images/user.png" alt="" />
                    <div className="post__topInfo">
                        <h3>{props.name} {props.firstname}</h3>
                        <p>{props.title}</p>
                        <p className="post__topInfo_time">{postTime}</p>
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