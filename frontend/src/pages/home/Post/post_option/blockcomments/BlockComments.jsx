import React, { useState, useEffect } from 'react';
import moment from "moment";
import Button from 'react-bootstrap/Button';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Swal from "sweetalert2";

import classes from './blockComments.module.css';
import axios from 'axios';
import AddComments from './addComments/AddComments';
import UpdateOrDeleteComments from './commentOption/UpdateOrDeleteComments';


const BlockComments = (props) => {
    const [comments, setComments] = useState([]);
    const [nbComment, setNbComment] = useState([]);
    const [seeComment, setSeeComment] = useState(false);
    const [isClickUpdate, setIsClickUpdate] = useState(false);

    console.log(props);

    useEffect(() => {
        getComments();
    }, [])

    //requete pour recuperer les Commentaires
    const getComments = () => {

        axios.get("http://localhost:3000/api/comments/post/" + props.postId, {
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

    //fonction voir les commentaires
    const handleClickSeeComment = (e) => {
        e.preventDefault();
        console.log(seeComment);
        if (seeComment === true) {
            setSeeComment(false);
        }
        else {
            setSeeComment(true);
        }
    }

    //fonction 
    const handleClickUpdate = () => {
        console.log('modifier');
        console.log(comments.id);

        if (isClickUpdate === true) {
            setIsClickUpdate(false);
        }
        else {
            setIsClickUpdate(true);
        }

    }


    //fonction supprimer un post
    const handleDelete = () => {
        console.log('supprimer');
        console.log(comments.id);
        Swal.fire({
            title: 'êtes vous sur?',
            text: "Une fois supprimer le commentaire ne sera definitivement plus disponible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer mon commentaire!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete("http://localhost:3000/api/comments/" + comments.id, {
                        headers: { Authorization: `Bearer ${props.token}` },
                    })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire(
                                    'Commentaire Supprimé!',
                                    'Votre commentaire a bien eté supprimer.',
                                    'success'
                                )

                            }
                        })
                        .catch((error) => {
                            console.log('erreur suppresion post');
                        });
                }
            })


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
                                        <ButtonGroup>
                                            <Button
                                                variant="Light"
                                                //className={classes.btnUpdate}
                                                onClick={handleClickUpdate}
                                                title="Modifier">
                                                <i className="far fa-edit"></i>
                                            </Button>
                                            <Button
                                                variant="Light"
                                                //className={classes.btnDelete}
                                                title="Supprimer"
                                                onClick={handleDelete}>
                                                <i className="fas fa-trash-alt"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="card-body">
                                        <blockquote className="blockquote mb-0">
                                         <p>{comment.comment}</p> 
                                            

                                            <footer className="blockquote-footer">
                                                Posté le: {moment(comment.time_comment).format('dddd Do MMMM YYYY, h:mm:ss')}<br />
                                                Il y a : {moment(comment.time_comment, "YYYYMMDD, h:mm:ss").fromNow()}
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div> : null}
            <div className="bottom" >
                <AddComments postId={props.postId} userId={props.userId} token={props.token} />
            </div>

        </div>

    );
};

export default BlockComments;