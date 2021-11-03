//Import
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

//Import classes css
import classes from './addPost.module.css';

//Import elements react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

//fonction validate
const validate = values => {

    const errors = {};

    if (!values.addPostTitle) {
        errors.addPostTitle = 'Titre requis';
    }
    if (!values.addPostContent) {
        errors.addPostContent = 'message requis';
    }

    return errors;
};

const AddPost = ({ token, handleRefreshPost }) => {

    const [image, setImage] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            addPostTitle: '',
            addPostContent: '',
        },
        validate,

        onSubmit: values => {
            setTitle(values.addPostTitle);
            setContent(values.addPostContent);

            const message = JSON.stringify({
                title,
                content
            })

            const data = new FormData();
            data.append('image', image[0]);
            data.append('post', message);

            console.log(data);

            axios.post("http://localhost:3000/api/messages", data, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    handleRefreshPost();
                    setImage('');
                    setTitle('');
                    setContent('');
                    values.addPostContent = '';
                    values.addPostTitle = '';
                    handleClose();

                })
                .catch((error) => {
                    console.log('erreur ajout post');
                });
        },
    });

    return (
        <Container className="messageSender__top">
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

                        <input
                            id="addPostContent"
                            className={["form-control", classes.input].join(' ')}
                            placeholder="Qu'avez vous envie de poster?"
                            type="textarea"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addPostContent}
                        />
                        {formik.touched.addPostContent && formik.errors.addPostContent ? (
                            <div className={classes.error}>{formik.errors.addPostContent}</div>
                        ) : null}

                        <input
                            className="form-control"
                            type="file"
                            onChange={(event) => { setImage(event.target.files) }}
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