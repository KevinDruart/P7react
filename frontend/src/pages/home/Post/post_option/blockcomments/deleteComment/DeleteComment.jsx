import React, { useState, useContext } from 'react';
import { useHistory } from "react-router";
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import axios from 'axios';

import LoginContext from '../../../../../../contextes/LoginContext';

const DeleteComment = (props) => {
    const history = useHistory();

    const { isAdmin } = useContext(LoginContext);

    const handleDelete = () => {
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
                    axios.delete("http://localhost:3000/api/comments/" + props.commentId, isAdmin, {
                        headers: { Authorization: `Bearer ${props.token}` },
                    })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire(
                                    'Commentaire Supprimé!',
                                    'Votre commentaire a bien eté supprimer.',
                                    'success'
                                )
                                // history.push('/home');
                                window.location.reload();
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: "Une erreur s'est produite de la suppresion",
                                footer: 'Essayer a nouveau, si cela persiste <a href="">contacter nous</a>'
                              })
                        });
                }
            })


    }

    return (
        <Button
            variant="Light"
            title="Supprimer"
            onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    );
};

export default DeleteComment;