
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

import classes from "./update.module.css";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from "react-bootstrap/ButtonGroup";


const UpdatePost = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();

    const postId = props.postId;
    const postUserId = props.postUserId;
    const admin = props.admin;
    const userId = props.userId;
    const token = localStorage.getItem('authToken');

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
        <div className="right">
            <ButtonGroup vertical>
                <Button 
                variant="Light"
                className={classes.btnUpdate} 
                onClick={handleShow} 
                title="Modifier">
                    <i className="far fa-edit"></i>
                </Button>
                <Button 
                variant="Light"
                className={classes.btnDelete} 
                title="Supprimer" 
                onClick={handleClickDelete}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </ButtonGroup>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Modifier le Post</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <i className="fas fa-times-circle"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className={["d-flex", classes.modalBody].join(' ')}>
                        <div className="left">
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Titre du post</Form.Label>
                                    <Form.Control type="text" placeholder="Titre du post" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Message du post" />
                                </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" />
                                </Form.Group>
                                <Button variant="success">Valider</Button>
                            </Form>
                        </div>
                        <div className="right">
                            <h4>Votre post actuel:</h4>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={props.postImg} />
                                <Card.Body>
                                    <Card.Title>{props.postTitle}</Card.Title>
                                    <Card.Text>
                                        {props.postContent}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdatePost;