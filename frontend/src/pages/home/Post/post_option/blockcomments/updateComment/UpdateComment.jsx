import React, { useState } from 'react';
import { useHistory } from "react-router";
import { useFormik } from 'formik';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import axios from 'axios';

const UpdateComment = (props) => {
    const [comments, setComments] = useState(props.message);
    const [isClickUpdate, setIsClickUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory();

    const handleUpdate = () => {
        console.log('modifier');
        console.log(props.commentId);
        console.log(comments)
        if (isClickUpdate === true) {
            setIsClickUpdate(false);
        }
        else {
            setIsClickUpdate(true);
        }
    }


    //fonction validate
    const validate = values => {
        const errors = {};

        if (!values.commentContent === null) {
            errors.commentContent = 'aucune modification en cours';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            commentContent: '',
        },
        validate,

        onSubmit: values => {

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
                  console.log('modification OK');
                }
                //modification annuler
                else if (result.isDenied) {
                console.log('modification annuler');
                }
            })



        },
    });

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
                            <form onSubmit={formik.handleSubmit}>
                                <textarea
                                    id="updatePostContent"
                                    className="form-control"
                                    placeholder="Qu'avez vous envie de poster?"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.commentContent}
                                ></textarea>
                                {formik.touched.commentContent && formik.errors.commentContent ? (
                                    <div >{formik.errors.commentContent}</div>
                                ) : null}
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