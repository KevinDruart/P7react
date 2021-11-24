import React, { useState } from 'react';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import axios from 'axios';

const DeleteComment = (props) => {
    const history = useHistory();

    const handleDelete = () => {
        console.log('supprimer');
        console.log(props.commentId);
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
                    axios.delete("http://localhost:3000/api/comments/" + props.commentId, {
                        headers: { Authorization: `Bearer ${props.token}` },
                    })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire(
                                    'Commentaire Supprimé!',
                                    'Votre commentaire a bien eté supprimer.',
                                    'success'
                                )
                                history.push('/home');
                            }
                        })
                        .catch((error) => {
                            console.log('erreur suppresion commentaire');
                        });
                }
            })


    }

    return (
        <Button
            variant="Light"
            //className={classes.btnDelete}
            title="Supprimer"
            onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    );
};

export default DeleteComment;