import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import LoginContext from '../../../../contextes/LoginContext';

const PostOption = (props) => {
    const [likes, setLikes] = useState('0');
    const [comments, setComments] = useState([]);
    const [nbComment, setNbComment] = useState([]);
    const [text, setText] = useState([]);
    const { userId } = useContext(LoginContext);
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

    //click commentaires
    // const handleClickComments = (e) => {
    //     e.preventDefault();
    //     getComments(props.post.id);
    // }

    //On submit ajout commentaire
    const handleAddComment = (e) => {
        e.preventDefault();
        postComments(props.post.id);
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
    // const getComments = () => {

    // }
    const getComments = () => {
        const postId = props.post.id;
        axios.get("http://localhost:3000/api/comments/post/" + postId, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setComments(response.data);
                setNbComment(response.data.length);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //requete pour ajouter un commentaire
    const postComments = () => {
        const postId = props.post.id;
        console.log(postId);

        const comment = {
            postId: postId,
            userId: userId,
            comment: text
        }
        console.log(comment);
        axios.post("http://localhost:3000/api/comments", comment, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert('Commentaires ajouté')
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
                    // onClick={handleClickComments}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom">
                    Commentaire<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {nbComment}
                        <span class="visually-hidden">Commentaires</span>
                    </span>
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
                            <form className="card" onSubmit={handleAddComment}>
                                <div className="card-header">
                                    Donner votre avis, exprimez vous!
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Laisser un commentaire</h5>
                                    <textarea
                                        className="card-text form-control"
                                        onChange={(e) => setText(e.target.value)}
                                        value={text}
                                        placeholder="Laisser un commentaire"
                                    ></textarea>
                                    <button className="btn btn-primary">commenter</button>
                                </div>
                            </form>
                        </div>
                        {comments.map((comment) => {
                            return (
                                <div className="bottom" key={comment.id}>
                                    <div className="card" >
                                        <div className="card-header">
                                            {comment.name} {comment.firstname}
                                        </div>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <p>{comment.comment}</p>
                                                <footer className="blockquote-footer">{comment.time_comment}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
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