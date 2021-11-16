import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import classes from "./update.module.css";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from "react-bootstrap/ButtonGroup";


const UpdatePost = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState([]);

    const history = useHistory();

    const postId = props.postId;
    const token = localStorage.getItem('authToken');

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
                                history.push("/home");
                            }
                        })
                        .catch((error) => {
                            console.log('erreur suppresion post');
                        });
                }
            })


    }

    //fonction validate
    const validate = values => {

        const errors = {};

        if (!values.updatePostTitle) {
            errors.updatePostTitle = 'Titre Requis';
        }
        if (!values.updatePostContent && !values.updatePostImage) {
            errors.updatePostTitle = '1 titre + 1 message ou 1 titre et 1 image sont necessaire';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            updatePostTitle: '',
            updatePostContent: '',
            updatePostImage: '',
        },
        validate,

        onSubmit: values => {
            console.log('modification demander')
            let data = '';

            const message = JSON.stringify({
                title: values.updatePostTitle,
                content: values.updatePostContent
            })

            if (image !== null && image !== '') {
                console.log('jai une image');
                data = new FormData();
                data.append('image', image[0]);
                data.append('post', message);
            }
            else {
                console.log('pas image');
                data = message;
            }

            Swal.fire({
                title: 'Voulez vous vraiment effectuer ces changements?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'enregistré',
                denyButtonText: `Ne pas enregistré`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.put("http://localhost:3000/api/messages/" + postId, data, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then(response => {
                            console.log(response);
                            setImage('');
                            values.updatePostContent = '';
                            values.updatePostTitle = '';
                            handleClose();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Le post a bien été modifié',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch((error) => {
                            console.log('erreur ajout post');
                        });
                } else if (result.isDenied) {
                    setImage('');
                    values.updatePostContent = '';
                    values.updatePostTitle = '';
                    handleClose();
                    Swal.fire('Aucun changement sauvegardé', '', 'info')
                }
            })



        },
    });


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
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    id="updatePostTitle"
                                    className="form-control"
                                    placeholder="Titre de votre post"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.updatePostTitle}
                                />
                                {formik.touched.updatePostTitle && formik.errors.updatePostTitle ? (
                                    <div className={classes.error}>{formik.errors.updatePostTitle}</div>
                                ) : null}
                                <textarea
                                    id="updatePostContent"
                                    className="form-control"
                                    placeholder="Qu'avez vous envie de poster?"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.updatePostContent}

                                ></textarea>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={(event) => {
                                        setImage(event.target.files)
                                        formik.values.updatePostImage = event.target.files
                                    }}
                                />
                                <Button variant="success" type="submit">Valider</Button>
                            </form>
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