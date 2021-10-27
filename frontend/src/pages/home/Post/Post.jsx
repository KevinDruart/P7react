import React from 'react';
import Container from "react-bootstrap/Container";

import classes from './post.module.css';
import './post.css';


const Posts = ({post}) => {


    return (
        <Container className="Post">
            <div className="post">
                <div className="post__top">
                    <img className="user__avatar post__avatar" src="./images/user.png" alt="" />
                    <div className="post__topInfo">
                        <h3>{post.name} {post.firstname}</h3>
                        <p>{post.title}</p>
                        <p className="post__topInfo_time">{post.time_post}</p>
                    </div>
                </div>

                <div className="post__bottom">
                    <img src={post.image} className={classes.imgPost} alt={post.title}/>
                    <p>{post.content}</p>
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