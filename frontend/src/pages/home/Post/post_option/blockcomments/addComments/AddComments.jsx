import React, { useState, useContext } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from "sweetalert2";

import LoginContext from '../../../../../../contextes/LoginContext';

import classes from '../blockComments.module.css';

const AddComments = (props) => {
    const history = useHistory();
    const { token } = useContext(LoginContext);

    const [text, setText] = useState([]);

    //On submit ajout commentaire
    const handleAddComment = (e) => {
        e.preventDefault();
        sendComments(props.postId);
    }


    //requete pour ajouter un commentaire
    const sendComments = () => {
        const comment = {
            postId: props.postId,
            comment: text
        }
        axios.post("http://localhost:3000/api/comments/post/" + props.postId, comment, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Le commentaire a bien été publié',
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/home");
            })
            .catch(error => {
                Swal.fire({
                    icon: 'Une erreur ',
                    title: "Une erreur s'est produite",
                    text: "Oups.. Votre commentaire n'a pas pu être publier!",
                    footer: 'Essayer a nouveau, si cela persiste <a href="">Contacter nous</a>'
                })
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