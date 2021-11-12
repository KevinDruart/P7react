import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import Comments from '../comments/Comments';
import LoginContext from '../../../../contextes/LoginContext';

const PostOption = (props) => {
    const [likes, setLikes] = useState('0');
    const [comments, setComments] = useState([]);
    const { userId, isAdmin } = useContext(LoginContext);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        getComments();
    }, [])


    let like = {
        userId: userId,
        postId: props.post.id,
        iLike: likes
    };

    //click like
    const handleClickLike = (e) => {
        e.preventDefault();
        setLikes(1);
        console.log("j'aime");
        console.log(props.post.id);
        console.log(userId);
        sendLike();
    }

    //click dislike
    const handleClickDislike = (e) => {
        e.preventDefault();
        setLikes(-1);
        console.log("je n'aime pas");
        console.log(props.post.id);
        console.log(userId);
        sendLike();
    }

    //click commentaires
    const handleClickComments = (e) => {
        e.preventDefault();
        console.log("je veut commenter");
        console.log(props.post.id);

    }

    //fonction d'envoie du like ou dislike
    const sendLike = () => {
        axios.post("http://localhost:3000/api/likes/" + props.post.id, like, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                alert("Votre avis a été ajouter")
            })
            .catch((error) => {
                alert("Impossible d'ajouter votre avis, veuillez essayer a nouveau ultérieurement.")
            });
    }

    //requete pour recuperer les Commentaires
    const getComments = () => {
        axios.get("http://localhost:3000/api/comments/"+ props.post.id, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                setComments(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
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
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom">

                    Commentaire
                </Button>
            </ButtonGroup>
            <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">Commentaires</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small">

                    <div className="comments">
                        <div className="top">
                            <form className="card">
                                <div className="card-header">
                                    Donner votre avis, exprimez vous!
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Laisser un commentaire</h5>
                                    <textarea className="card-text form-control"></textarea>
                                    <button className="btn btn-primary">commenter</button>
                                </div>
                            </form>
                        </div>
                        {comments.map((comment) => {
                            return (
                                <div className="bottom" key={comment.id}>
                                    <Comments comment={comment} />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostOption;