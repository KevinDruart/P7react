import React, { useContext } from 'react';


//Import des elements react bootstrap
import Container from "react-bootstrap/Container";

import LoginContext from '../../../contextes/LoginContext';

//import des components 
import UpdatePost from '../updatePost/UpdatePost';

//import des classes css
import classes from './post.module.css';
import './post.css';
import PostOption from './post_option/PostOption';

const Posts = ({ post }) => {

    const { userId, isAdmin } = useContext(LoginContext);

    //Gestion de la date 
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

    let postConfigButton;
    console.log(userId);
    console.log(post.userId);
    console.log(userId === post.userId);
    if (userId === post.UserId) {
        postConfigButton =
            <UpdatePost
                className={classes.right}
                postId={post.id}
                postTitle={post.title}
                postContent={post.content}
                postImg={post.image}
                postUserId={post.userId}
                userId={userId}
                admin={isAdmin} />;
    } else if (isAdmin) {
        postConfigButton =
            <UpdatePost
                className={classes.right}
                postId={post.id}
                postTitle={post.title}
                postContent={post.content}
                postImg={post.image}
                postUserId={post.userId}
                userId={userId}
                admin={isAdmin} />;
    }
    else {
        postConfigButton = null;
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

                    {postConfigButton}
                </div>

                <div className="post__bottom">
                    <img src={post.image} className={classes.imgPost} alt={post.title} />
                    <p>{post.content}</p>
                </div>
                <PostOption post={post} />
            </div>
        </Container>
    );
};

export default Posts;