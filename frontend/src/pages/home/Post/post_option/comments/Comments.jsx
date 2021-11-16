import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

import classes from './comments.module.css';

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [nbComment, setNbComment] = useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        getComments();
    }, [])


    //On submit ajout commentaire
    const handleAddComment = (e) => {
        e.preventDefault();
        sendComments(props.postId);
    }

    //requete pour recuperer les Commentaires
    const getComments = () => {
        const postId = props.postId;
        axios.get("http://localhost:3000/api/comments/post/" + postId, {
            headers: { Authorization: `Bearer ${props.token}` },
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
    const sendComments = () => {
        const comment = {
            postId: props.postId,
            userId: props.userId,
            comment: text
        }
        //console.log(comment);
        axios.post("http://localhost:3000/api/comments", comment, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                console.log(response);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Le commentaire a bien été publié',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (

        <div className="comments">
            <div className={classes.top}>
                {comments.map((comment) => {
                    return (
                        <div className="comments_body" key={comment.id}>
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
            <div className="bottom" >
                <form onSubmit={handleAddComment}>
                    <div className={classes.comments_option}>

                        <button className="btn btn-primary position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" title="Commenter">
                            <i className="fas fa-comments"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {nbComment}
                                <span class="visually-hidden">commentaires</span>
                            </span>
                        </button>
                    </div>
                    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasBottomLabel">Laisser un commentaire</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body small">
                            <div className="card-body">
                                <h5 className="card-title">Exprimez vous:</h5>
                                <textarea
                                    className="card-text form-control"
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    placeholder="Laisser un commentaire"
                                ></textarea>
                                <button className="btn btn-primary">commenter</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    );
};

export default Comments;