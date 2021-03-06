//Import
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';

//Import elements react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

//import des component
import Messages from '../../../../components/message/Messages';

//Import classes css
import classes from './addPost.module.css';

//fonction validate et leur message d'erreur
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

const AddPost = ({ token, handleRefreshPost }) => {

    const [image, setImage] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addPublish, setAddPublish] = useState(false);

    const formik = useFormik({
        initialValues: {
            addPostTitle: '',
            addPostContent: '',
            addPostImage: '',
        },
        validate,

        onSubmit: values => {

            let data = '';

            //si on a une image
            if (image.length === 0) {
                data = {
                    title: values.addPostTitle,
                    content: values.addPostContent
                };
            }
            //si aucune image
            else {
                const message = JSON.stringify({
                    title: values.addPostTitle,
                    content: values.addPostContent
                })

                data = new FormData();
                data.append('image', image[0]);
                data.append('post', message);
            }

            axios.post("http://localhost:3000/api/messages", data, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    handleRefreshPost();
                    setImage('');
                    values.addPostContent = '';
                    values.addPostTitle = '';
                    handleClose();
                    setAddPublish(true);
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Une erreur s'est produite lors de la publication",
                        footer: 'Essayer a nouveau, si cela persiste <a href="">contacter nous</a>'
                      })
                });
        },
    });

    return (
        <Container className="messageSender__top">
            {
                addPublish && <Messages
                    message="Le post a bien et?? publier"
                    typeColor="alert-success"
                />
            }
            <Button className={classes.addPostBtn} onClick={handleShow} title="ajouter un post">
                <i className="fas fa-plus-circle"></i>
                <p className={classes.titleBtn}>Ajouter un post</p>
            </Button>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Ajouter un Post</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <i className={["fas fa-times-circle", classes.faAdd].join(' ')}></i>
                    </Button>
                </Modal.Header>
                <Modal.Body className={classes.modalBody}>
                    <form onSubmit={formik.handleSubmit} className="addPost">

                        <input
                            id="addPostTitle"
                            className={["form-control", classes.input].join(' ')}
                            placeholder="Titre de votre post"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addPostTitle}
                        />
                        {formik.touched.addPostTitle && formik.errors.addPostTitle ? (
                            <div className={classes.error}>{formik.errors.addPostTitle}</div>
                        ) : null}

                        <textarea
                            id="addPostContent"
                            className={["form-control", classes.input].join(' ')}
                            placeholder="Qu'avez vous envie de poster?"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addPostContent}
                        ></textarea>

                        <input
                            className="form-control"
                            type="file"
                            onChange={(event) => {
                                setImage(event.target.files)
                                formik.values.addPostImage = event.target.files
                            }}
                        />
                        <button type="submit" className="btn" >
                            <i className="far fa-share-square"></i>
                            <h3>Partager</h3>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </Container>

    );
};

export default AddPost;