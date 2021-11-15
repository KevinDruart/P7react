import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                alert('Commentaires ajouté')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (



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
    );
};

export default Comments;