import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Swal from "sweetalert2";
import LoginContext from '../../../../contextes/LoginContext';

//Import elements react bootstrap
import Button from 'react-bootstrap/Button';


const DeleteAccount = (props) => {
    const { userId, setUserId, setIsAdmin, setIsAuthenticated } = useContext(LoginContext);
    const history = useHistory();

      //SUPPRIMER LE COMPTE
      const handleDeleteMyAccount = (e) => {
        e.preventDefault();
        console.log("supprimer mon compte");
        if (props.userId === userId) {
            Swal.fire({
                title: 'êtes vous sur de vouloir nous quitter?',
                text: "Vous ne pourrez plus acceder a notre communauté.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Annuler',
                confirmButtonText: 'Oui, supprimer mon compte!'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios.delete("http://localhost:3000/api/auth/" + props.userId, {
                            headers: { Authorization: `Bearer ${props.token}` },
                        })
                            .then(response => {
                                alert("Votre compte a bien etait supprimer, vous allez etre redirigé.");
                                localStorage.removeItem('authId');
                                localStorage.removeItem('authToken');
                                localStorage.removeItem('admin');
                                setIsAuthenticated(false);
                                setUserId(null);
                                setIsAdmin(false);
                                history.push('/');
                            })
                            .catch((error) => {
                                console.log('erreur suppresion du compte');
                            });
                    }
                })
        }
        else {
            alert('vous ne pouvez pas supprimer votre compte, contacter un administrateur')
        }
    }

    return (
        <Button variant="danger" title="Supprimer mon compte" onClick={handleDeleteMyAccount}>
            <i className="fas fa-trash-alt"></i>
        </Button>
    );
};

export default DeleteAccount;