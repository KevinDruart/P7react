import React, { useState, useContext } from 'react';
import axios from 'axios';

//Import des elements react bootstrap
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import LoginContext from '../../../contextes/LoginContext';

//import des components 
import ConfigPost from '../configPost/ConfigPost';

//import des classes css
import classes from './post.module.css';
import './post.css';

const Posts = ({ post }) => {

    const { userId, isAdmin } = useContext(LoginContext);
    const token = localStorage.getItem('authToken');
    const [likes, setLikes] = useState('0');


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
    let like = {
        userId: userId,
        postId: post.id,
        iLike: likes
    };

    console.log(like);

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        setLikes(1);
        console.log("j'aime");
        console.log(post.id);
        console.log(userId);
        sendLike();
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        setLikes(-1);
        console.log("je n'aime pas");
        console.log(post.id);
        console.log(userId);
        sendLike();
    }

    //click commentaires
    const handleClickComments = (e) => {
        e.preventDefault();
        console.log("je veut commenter");
    }

    //fonction d'envoie du like ou dislike
    const sendLike = () => {
        axios.post("http://localhost:3000/api/messages/" + post.id + "/like", like, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log('erreur like ou dislike');
            });
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

                    <ConfigPost className={classes.right} postId={post.id} postUserId={post.userId} userId={userId} admin={isAdmin} />
                </div>

                <div className="post__bottom">
                    <img src={post.image} className={classes.imgPost} alt={post.title} />
                    <p>{post.content}</p>
                </div>

                <div className="post__options">
                    <ButtonGroup className="mb-2">
                        <Button
                            variant="success"
                            title="J'aime"
                            onClick={handleClickLike}
                        >
                            <i className="far fa-thumbs-up" ></i>
                        </Button>
                        <Button
                            variant="danger"
                            title="Je n'aime pas"
                            onClick={handleClickDislike}
                        >
                            <i className="far fa-thumbs-down"></i>
                        </Button>
                        <Button
                            variant="light"
                            title="Commenter"
                            onClick={handleClickComments}
                        >
                            <Badge bg="secondary">9</Badge>
                            Commentaire
                        </Button>
                    </ButtonGroup>

                </div>
            </div>
        </Container>
    );
};

export default Posts;