import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from "sweetalert2";
import classes from '../blockComments.module.css';

const AddComments = (props) => {
    const history = useHistory();

    const [text, setText] = useState([]);
    console.log(props.postId);

    //On submit ajout commentaire
    const handleAddComment = (e) => {
        e.preventDefault();
        sendComments(props.postId);
    }


    //requete pour ajouter un commentaire
    const sendComments = () => {
        const comment = {
            postId: props.postId,
            userId: props.userId,
            comment: text
        }
        console.log(props.postId);
        axios.post("http://localhost:3000/api/comments/post/" + props.postId, comment, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Le commentaire a bien été publié',
                    showConfirmButton: false,
                    timer: 1500
                })
                //history.replace("/home");
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <form onSubmit={handleAddComment}>
            <div className="card-body">
                <h5 className="card-title">Laisser un commentaire:</h5>
                <textarea
                    className="card-text form-control"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Laisser un commentaire"
                ></textarea>
                <button className="btn btn-primary">commenter</button>
            </div>
        </form>
    );
};

export default AddComments;