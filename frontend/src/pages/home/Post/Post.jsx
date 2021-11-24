import React, { useContext, useState } from 'react';

//Import des elements react bootstrap
import Container from "react-bootstrap/Container";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import LoginContext from '../../../contextes/LoginContext';

//import des components 
import UpdatePost from './updatePost/UpdatePost';
import PostOption from './post_option/PostOption';
import LikeDislike from './post_option/like/LikeDislike';
import DeletePost from './deletPost/DeletePost';

//import des classes css
import classes from './post.module.css';

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

            <div className={classes.post}>
                <div className={classes.postTop}>
                    <div className={classes.left}>
                        <img className={["postAvatar", classes.userAvatar].join(' ')} src="./images/user.png" alt="" />
                        <div className={classes.postTopInfo}>
                            <h3>{props.post.name} {props.post.firstname}</h3>
                            <p>{props.post.title}</p>
                            <p className={classes.postTopInfoTime}>{postTime}</p>
                        </div>
                    </div>
                    {
                        isCanEditDelete && <div className={classes.right}>
                            <ButtonGroup vertical>
                                <UpdatePost
                                    postId={props.post.id}
                                    postTitle={props.post.title}
                                    postContent={props.post.content}
                                    postImg={props.post.image}
                                    postUserId={props.post.userId}
                                    userId={userId}
                                    admin={isAdmin} />
                                <DeletePost
                                    postId={props.post.id}
                                    postUserId={props.post.userId}
                                    userId={userId}
                                    admin={isAdmin} />
                            </ButtonGroup>
                        </div>
                    }

                </div>

                <div className={classes.postBottom}>
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