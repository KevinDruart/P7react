import React, { useContext, useState } from 'react';

//Import des elements react bootstrap
import Container from "react-bootstrap/Container";

import LoginContext from '../../../contextes/LoginContext';

//import des components 
import UpdatePost from '../updatePost/UpdatePost';

//import des classes css
import classes from './post.module.css';
import './post.css';
import PostOption from './post_option/PostOption';
import LikeDislike from './post_option/like/LikeDislike';

const Posts = (props) => {

    const { userId, isAdmin } = useContext(LoginContext);
    const [isCanEditDelete] = useState(parseInt(userId) === props.post.userId || isAdmin === true);

    //Gestion de la date 
    const datePost = new Date(props.post.time_post);
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
        <Container className={classes.Post}>

            <div className="post">
                <div className="post__top">
                    <div className={classes.left}>
                        <img className="user__avatar post__avatar" src="./images/user.png" alt="" />
                        <div className="post__topInfo">
                            <h3>{props.post.name} {props.post.firstname}</h3>
                            <p>{props.post.title}</p>
                            <p className="post__topInfo_time">{postTime}</p>
                        </div>
                    </div>
                    {
                        isCanEditDelete && <UpdatePost
                            className={classes.right}
                            postId={props.post.id}
                            postTitle={props.post.title}
                            postContent={props.post.content}
                            postImg={props.post.image}
                            postUserId={props.post.userId}
                            userId={userId}
                            admin={isAdmin} />
                    }

                </div>

                <div className="post__bottom">
                    {
                        props.post.image ?
                            <img src={props.post.image} className={classes.imgPost} alt={props.post.title} /> : null
                    }
                    <p>{props.post.content}</p>
                </div>
                <PostOption post={props.post} postId={props.post.id} />
            </div>
            <LikeDislike
                postId={props.post.id}
                userId={userId}
                token={props.token}
            />
        </Container>
    );
};

export default Posts;