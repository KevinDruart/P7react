import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const LikeDislike = (props) => {
    //const [likes, setLikes] = useState('0');
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [userLikeIt, setUserLikeIt] = useState(0);
    const [userDislikeIt, setUserDislikeIt] = useState(0);
    //console.log(props);//props = postId, userId, token

    const history = useHistory();

    useEffect(() => {
        getNbLikeOrDislike();
        userLiked();
    }, [])

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        // setLikes(1);
         sendLike(userLikeIt === 1 ? 0 : 1);
        if (userLikeIt === 1) {
            setLiked(liked -1)
        }
        else if (userLikeIt === 0) { 
            setLiked(liked +1)
        }

        if (userDislikeIt === 1) {
            setDisliked(disliked -1)
        }
        setUserDislikeIt(0);
        setUserLikeIt(userLikeIt === 1 ? 0 : 1);
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        // setLikes(-1);
        // sendLike();
        sendLike(userDislikeIt === 1 ? 0 : -1);
        if (userDislikeIt === 1) {
            setDisliked(disliked -1)
        }
        else if (userDislikeIt === 0) { 
            setDisliked(disliked +1)
        }

        if (userLikeIt === 1) {
            setLiked(liked -1)
        }
        setUserLikeIt(0);
        setUserDislikeIt(userDislikeIt === 1 ? 0 : 1);
    }

    //fonction d'envoie du like ou dislike
    const sendLike = (likeValue) => {
     const like = {
         postId: props.postId,
         iLike: likeValue
     };

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

    //fonction pour voir si j'ai like ou dislike
    const userLiked = () => {
        axios.get("http://localhost:3000/api/likes/post/" + props.postId, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                console.log(response);
                if (response.data[0] !== undefined ) {
                    if (response.data[0].like === 1) {
                        setUserLikeIt(1);
                        setUserDislikeIt(0);
                    }
                    else if (response.data[0].like === -1) {
                        setUserDislikeIt(1);
                        setUserLikeIt(0);
                    }
                }
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
            { userLikeIt ? <i className="fas fa-thumbs-up" ></i> : <i className="far fa-thumbs-up" ></i> }
                <span className="text-light">{liked}</span>
            </Button>
            <Button
                variant="danger"
                title="Je n'aime pas"
                onClick={handleClickDislike}
            >
            { userDislikeIt ? <i className="fas fa-thumbs-down" ></i> : <i className="far fa-thumbs-down" ></i> }

                <span className="text-light">{disliked}</span>
            </Button>
        </ButtonGroup>
    );
};

export default LikeDislike;