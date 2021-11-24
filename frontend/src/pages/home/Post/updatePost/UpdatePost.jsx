import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import classes from "../post.module.css";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdatePost = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [image, setImage] = useState([]);

    const history = useHistory();

    const postId = props.postId;
    const token = props.token;

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
            let data = '';

            const message = JSON.stringify({
                title: values.updatePostTitle,
                content: values.updatePostContent
            })

            if (image.length === 0) {
                data = {
                    title: values.updatePostTitle,
                    content: values.updatePostContent,
                };
            }
            else {
                data = new FormData();
                data.append('image', image[0]);
                data.append('post', message);
            }
            //message confirmation de modification
            Swal.fire({
                title: 'Voulez vous vraiment effectuer ces changements?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'enregistré',
                denyButtonText: `Ne pas enregistré`,
            }).then((result) => {
                //modification confirmer
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
                            //message
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
                }
                //modification annuler
                else if (result.isDenied) {
                    setImage('');
                    values.updatePostContent = '';
                    values.updatePostTitle = '';
                    handleClose();
                    //message
                    Swal.fire('Aucun changement sauvegardé', '', 'info')
                }
            })
        },
    });


    return (
        <>
            <Button
                variant="Light"
                className={classes.btnUpdate}
                onClick={handleShow}
                title="Modifier">
                <i className="far fa-edit"></i>
            </Button>
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
        </>
    );
};

export default UpdatePost;