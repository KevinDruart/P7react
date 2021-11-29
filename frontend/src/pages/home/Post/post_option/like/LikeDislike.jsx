import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2';

import LoginContext from '../../../../../contextes/LoginContext';

//import des elements react-bootstrap
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const LikeDislike = (props) => {

    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [userLikeIt, setUserLikeIt] = useState(0);
    const [userDislikeIt, setUserDislikeIt] = useState(0);
    const { token } = useContext(LoginContext);

    const history = useHistory();

    useEffect(() => {
        getNbLikeOrDislike();
        userLiked();
    }, [])

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        sendLike(userLikeIt === 1 ? 0 : 1);
        if (userLikeIt === 1) {
            setLiked(liked - 1)
        }
        else if (userLikeIt === 0) {
            setLiked(liked + 1)
        }

        if (userDislikeIt === 1) {
            setDisliked(disliked - 1)
        }
        setUserDislikeIt(0);
        setUserLikeIt(userLikeIt === 1 ? 0 : 1);
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        sendLike(userDislikeIt === 1 ? 0 : -1);
        if (userDislikeIt === 1) {
            setDisliked(disliked - 1)
        }
        else if (userDislikeIt === 0) {
            setDisliked(disliked + 1)
        }

        if (userLikeIt === 1) {
            setLiked(liked - 1)
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
            headers: { Authorization: `Bearer ${token}` },
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
                Swal.fire({
                    icon: 'Une erreur ',
                    title: "Une erreur s'est produite",
                    text: "Oups.. Votre avis n'a pas pu être ajouter!",
                    footer: 'Essayer a nouveau, si cela persiste <a href="">Contacter nous</a>'
                })
            });
    }

    //fonction pour recuperer le nombre de like et dislike sur un post
    const getNbLikeOrDislike = () => {
        axios.get("http://localhost:3000/api/likes/" + props.postId, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                setLiked(response.data.liked);
                setDisliked(response.data.disliked);
            })
            .catch((error) => {
                return null;
            });
    }

    //fonction pour voir si j'ai like ou dislike
    const userLiked = () => {
        axios.get("http://localhost:3000/api/likes/post/" + props.postId, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                if (response.data[0] !== undefined) {
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
                return null;
            });
    }

    return (
        <ButtonGroup vertical size="sm">
            <Button
                variant="success"
                title="J'aime"
                onClick={handleClickLike}
            >
                {userLikeIt ? <i className="fas fa-thumbs-up" ></i> : <i className="far fa-thumbs-up" ></i>}
                <span className="text-light">{liked}</span>
            </Button>
            <Button
                variant="danger"
                title="Je n'aime pas"
                onClick={handleClickDislike}
            >
                {userDislikeIt ? <i className="fas fa-thumbs-down" ></i> : <i className="far fa-thumbs-down" ></i>}

                <span className="text-light">{disliked}</span>
            </Button>
        </ButtonGroup>
    );
};

export default LikeDislike;