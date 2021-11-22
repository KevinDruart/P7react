import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const LikeDislike = (props) => {
    const [likes, setLikes] = useState('0');
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    console.log(props);//props = postId, userId, token

    const history = useHistory();

    useEffect(() => {
        getNbLikeOrDislike();
        userLiked();
    }, [likes])

    let like = {
        userId: props.userId,
        postId: props.postId,
        iLike: likes
    };

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        setLikes(1);
        sendLike();
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        setLikes(-1);
        sendLike();
    }

    //fonction d'envoie du like ou dislike
    const sendLike = () => {
        axios.post("http://localhost:3000/api/likes/" + props.postId, like, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Votre avis a été publier',
                    showConfirmButton: false,
                    timer: 1500
                });
                getNbLikeOrDislike();
            })
            .catch((error) => {
                alert("Impossible d'ajouter votre avis, veuillez essayer a nouveau ultérieurement.")
            });
    }

    //fonction pour recuperer le nombre de like et dislike sur un post
    const getNbLikeOrDislike = () => {
        axios.get("http://localhost:3000/api/likes/" + props.postId, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                //console.log(response.data);//liked et disliked
                setLiked(response.data.liked);
                setDisliked(response.data.disliked);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const userLiked = () => {
        axios.get("http://localhost:3000/api/likes/post/" + props.postId, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <ButtonGroup vertical size="sm">
            <Button
                variant="success"
                title="J'aime"
                onClick={handleClickLike}
            >
                <i className="far fa-thumbs-up" ></i>
                <span className="text-light">{liked}</span>
            </Button>
            <Button
                variant="danger"
                title="Je n'aime pas"
                onClick={handleClickDislike}
            >
                <i className="far fa-thumbs-down"></i>
                <span className="text-light">{disliked}</span>
            </Button>
        </ButtonGroup>
    );
};

export default LikeDislike;