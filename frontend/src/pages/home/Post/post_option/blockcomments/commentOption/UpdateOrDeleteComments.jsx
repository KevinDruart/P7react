import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Swal from "sweetalert2";
import axios from 'axios';

const UpdateOrDeleteComments = (props) => {

    const handleUpdate = () => {
        console.log('modifier');
        console.log(props.commentId);

    }

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

                            }
                        })
                        .catch((error) => {
                            console.log('erreur suppresion post');
                        });
                }
            })


    }



    return (
        <ButtonGroup>
            <Button
                variant="Light"
                //className={classes.btnUpdate}
                onClick={handleUpdate}
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
    );
};

export default UpdateOrDeleteComments;