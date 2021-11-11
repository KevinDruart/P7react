
import React, { useState } from 'react';
import { useFormik } from 'formik';
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
    const [image, setImage] = useState([]);

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

    //fonction validate
    const validate = values => {

        const errors = {};

        if (!values.addPostTitle) {
            errors.addPostTitle = 'Titre Requis';
        }
        if (!values.addPostContent && !values.addPostImage) {
            errors.addPostTitle = '1 titre + 1 message ou 1 titre et 1 image sont necessaire';
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

            const message = JSON.stringify({
                title: values.updatePostTitle,
                content: values.updatePostContent
            })

            const data = new FormData();
            data.append('image', image[0]);
            data.append('post', message);

            console.log(data);

            axios.put("http://localhost:3000/api/messages", data, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    setImage('');
                    values.updatePostContent = '';
                    values.updatePostTitle = '';
                    handleClose();

                })
                .catch((error) => {
                    console.log('erreur ajout post');
                });
            // }
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
                            <Form onSubmit={formik.handleSubmit}>
                                <input
                                    id="updatePostTitle"
                                    className="form-control"
                                    placeholder="Titre de votre post"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.addPostTitle}
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

                                >{formik.values.updatePostContent}</textarea>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={(event) => {
                                        setImage(event.target.files)
                                        formik.values.updatePostImage = event.target.files
                                    }}
                                />
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