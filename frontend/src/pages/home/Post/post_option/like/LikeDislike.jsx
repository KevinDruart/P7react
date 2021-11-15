import React, { useState } from 'react';
import axios from 'axios';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const LikeDislike = (props) => {
    const [likes, setLikes] = useState('0');

    let like = {
        userId: props.userId,
        postId: props.postId,
        iLike: likes
    };

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        setLikes(1);
        // console.log("j'aime");
        // console.log(props.post.id);
        // console.log(userId);
        sendLike();
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        setLikes(-1);
        // console.log("je n'aime pas");
        // console.log(props.post.id);
        // console.log(userId);
        sendLike();
    }

    //fonction d'envoie du like ou dislike
    const sendLike = () => {
        axios.post("http://localhost:3000/api/likes/" + props.postId, like, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                alert("Votre avis a été ajouter")
            })
            .catch((error) => {
                alert("Impossible d'ajouter votre avis, veuillez essayer a nouveau ultérieurement.")
            });
    }

    return (
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
        </ButtonGroup>
    );
};

export default LikeDislike;