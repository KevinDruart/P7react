import React from 'react';

import Container from "react-bootstrap/Container";
import { Accordion } from 'react-bootstrap';
import ConfigPost from '../configPost/ConfigPost';
import PostComments from '../postComments/PostComments';
import classes from './post.module.css';
import './post.css';



const Posts = ({ post }) => {

    const datePost = new Date(post.time_post);
    let postTime = datePost.toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    console.log(postTime);

    const handleClickLike = (e) => {
        e.preventDefault();
        console.log("j'aime");
    }

    const handleClickDislike = (e) => {
        e.preventDefault();
        console.log("je n'aime pas");
    }

    const handleClickComments = (e) => {
        e.preventDefault();
        console.log("je veut commenter");
    }
    return (
        <Container className="Post">
            <div className="post">
                <div className="post__top">
                    <div className={classes.left}>
                        <img className="user__avatar post__avatar" src="./images/user.png" alt="" />
                        <div className="post__topInfo">
                            <h3>{post.name} {post.firstname}</h3>
                            <p>{post.title}</p>
                            <p className="post__topInfo_time">{postTime}</p>
                        </div>
                    </div>
                    <ConfigPost className={classes.right} postId={post.id} postUId={post.userId} />
                </div>

                <div className="post__bottom">
                    <img src={post.image} className={classes.imgPost} alt={post.title} />
                    <p>{post.content}</p>
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <i className="fas fa-heart" onClick={handleClickLike}></i>
                    </div>
                    <div className="post__option">

                        <i className="far fa-thumbs-down" onClick={handleClickDislike}>Je n'aime pas</i>
                    </div>

                    <div className="post__option">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <i className="far fa-comments" >Commenter</i>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Posts;