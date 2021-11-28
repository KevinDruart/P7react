import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useHistory } from "react-router";
import classes from "../post.module.css";

import LoginContext from '../../../../contextes/LoginContext';

import Button from 'react-bootstrap/Button';

const DeletePost = (props) => {
    const { isAdmin } = useContext(LoginContext);
    const history = useHistory();

    //click supprimer
    const handleClickDelete = () => {
        axios.delete("http://localhost:3000/api/messages/" + props.postId, isAdmin, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then(response => {
                console.log(response);
                console.log('suppression valider');
                // history.push('/home');
                window.location.reload();
            })
            .catch((error) => {
                console.log('erreur suppression');
            });
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