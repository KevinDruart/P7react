import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import classes from './blockComments.module.css';
import axios from 'axios';

import LoginContext from '../../../../../contextes/LoginContext';

import AddComments from './addComments/AddComments';
import UpdateComment from './updateComment/UpdateComment';
import DeleteComment from './deleteComment/DeleteComment';
import ButtonGroup from "react-bootstrap/ButtonGroup";


const BlockComments = (props) => {
    const [comments, setComments] = useState([]);
    const [nbComment, setNbComment] = useState([]);
    const [seeComment, setSeeComment] = useState(false);
    const { userId, isAdmin, token } = useContext(LoginContext);
    console.log(isAdmin);
    
    const postUserId = comments[0];

    const [isCanEditDelete] = useState(comments.userId ===  parseInt(userId) || isAdmin === true);


    useEffect(() => {
        getComments();
    }, [])

    //requete pour recuperer les Commentaires
    const getComments = () => {

        axios.get("http://localhost:3000/api/comments/post/" + props.postId, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setComments(response.data);
                setNbComment(response.data.length);
            })
            .catch(error => {
                return null;
            })
    }

    //fonction voir les commentaires
    const handleClickSeeComment = (e) => {
        e.preventDefault();
        if (seeComment === true) {
            setSeeComment(false);
        }
        else {
            setSeeComment(true);
        }
    }

    return (

        <div className="comments">

            <div className={classes.blocBtnComments}>
                <button onClick={handleClickSeeComment} className="btn btn-light position-relative">
                    {seeComment ? 'Masquer' : 'Voir les commentaires'}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {nbComment}
                        <span className="visually-hidden">commentaires</span>
                    </span>
                </button>

            </div>
            {
                seeComment ? <div className={classes.top}>
                    {comments.map((comment) => {
                        return (
                            <div className="comments_body" key={comment.id}>
                                <div className="card" >
                                    <div className={["card-header", classes.blockquote].join(' ')}>
                                        <div>{comment.name} {comment.firstname}</div>
                                        {
                                            isCanEditDelete === true && <ButtonGroup>
                                                <UpdateComment
                                                    commentId={comment.id}
                                                    userIdComment={comment.commentUserId}
                                                    message={comment.comment}
                                                />
                                                <DeleteComment
                                                    commentId={comment.id}
                                                    userIdComment={comment.commentUserId}
                                                />
                                            </ButtonGroup>
                                        }
                                    </div>
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                            <p>{comment.comment}</p>
                                            <footer className="blockquote-footer">
                                                <Moment local="fr">{comment.time_comment}</Moment>
                                                <br />
                                                <Moment fromNow>{comment.time_comment}</Moment>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div> : null}
            <div className="bottom" >
                <AddComments
                    postId={props.postId}
                />
            </div>

        </div>

    );
};

export default BlockComments;