import React, { useState } from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import Swal from "sweetalert2";

//import des elements bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateComment = (props) => {
    const [text, setText] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    console.log(props.commentId);

    //On submit ajout commentaire
    const handleUpdateComment = (e) => {
        e.preventDefault();
        sendComments(props.commentId);
    }


    //requete pour envoyer le nouveau commentaire
    const sendComments = () => {
        const comment = {
            commentId: props.commentId,
            userId: props.userId,
            comment: text
        }
        console.log(props.commentId);
        axios.put("http://localhost:3000/api/comments/" + props.commentId, comment, {
            headers: { Authorization: `Bearer ${props.token}` },
        })
            .then((response) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Le commentaire a bien été modifié',
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
        <>
            <Button
                variant="Light"
                //className={classes.btnUpdate}
                onClick={handleShow}
                title="Modifier">
                <i className="far fa-edit"></i>
            </Button>
            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Modifier mon commentaire</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <i className="fas fa-times-circle"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <div className="left">
                            <form onSubmit={handleUpdateComment}>
                                <textarea
                                    className="card-text form-control"
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    placeholder="Laisser un commentaire"
                                ></textarea>

                                <Button variant="success" type="submit">Valider</Button>
                            </form>
                        </div>
                        <div className="right">
                            <h4>Votre commentaire actuel:</h4>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Text>
                                        {props.message}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateComment;