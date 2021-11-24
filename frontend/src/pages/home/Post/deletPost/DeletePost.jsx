import React, { useState } from 'react';

import axios from 'axios';
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import classes from "../post.module.css";


import Button from 'react-bootstrap/Button';

const DeletePost = (props) => {
    const history = useHistory();

    const postId = props.postId;
    const token = props.token;

    //click supprimer
    const handleClickDelete = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'êtes vous sur?',
            text: "Une fois supprimer le post ne sera definitivement plus disponible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, supprimer ce post!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete("http://localhost:3000/api/messages/" + postId, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire(
                                    'Post Supprimé!',
                                    'Le post a bien eté supprimer.',
                                    'success'
                                )
                                history.replace("/home");
                            }
                        })
                        .catch((error) => {
                            console.log('erreur suppresion post');
                        });
                }
            })

    }

    return (
        <Button
            variant="Light"
            className={classes.btnDelete}
            title="Supprimer"
            onClick={handleClickDelete}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    );
};

export default DeletePost;