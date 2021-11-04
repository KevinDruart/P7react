import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import classes from './configPost.module.css';


const ConfigPost = (props) => {
    const postId = props.postId;
    const postUserId = props.postUserId;
    const admin = props.admin;
    const userId = props.userId;
    const token = localStorage.getItem('authToken');

    const history = useHistory();

    //click modifier
    const handleClickUpdate = (e) => {
        e.preventDefault();
        console.log("modifier");
    }

    //click supprimer
    const handleClickDelete = (e) => {
        e.preventDefault();
        console.log("supprimer");
        axios.delete("http://localhost:3000/api/messages/" + postId, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                if (response.status === 200) {
                    alert('le post a bien etait supprimer');
                    history.push("/home");
                }
            })
            .catch((error) => {
                console.log('erreur suppresion post');
            });
    }

    if (userId !== postUserId && admin === false) {
        return null;
    }

    return (
        <div className={classes.manageBtn}>
            <ButtonGroup vertical>
                <Button variant="light" title="Modifier" onClick={handleClickUpdate}>
                    <i className={["fas fa-pencil-alt", classes.btnUpdate].join(' ')}></i>
                </Button>
                <Button variant="light" title="Supprimer" onClick={handleClickDelete}>
                    <i className={["fas fa-trash-alt", classes.btnDelete].join(' ')}></i>
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default ConfigPost;