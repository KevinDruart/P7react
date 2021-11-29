import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from "sweetalert2";

import LoginContext from '../../../../contextes/LoginContext';

//Import elements react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const validate = values => {

    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Nom requis';
    } else if (!/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/i.test(values.firstName)) {
        errors.firstName = "Le prénom ne peut pas contenir de caractere numerique et ou speciaux";
    }

    if (!values.lastName) {
        errors.lastName = 'Prenom requis';
    } else if (!/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/i.test(values.lastName)) {
        errors.lastName = "Le nom ne peut pas contenir de caractere numerique et ou speciaux";
    }

    if (!values.email) {
        errors.email = 'Adresse email requise';
    } else if (!/^[\w-ç\.]+@groupomania\.fr$/i.test(values.email)) {
        errors.email = "L'adresse email doit être uniquement @groupomania.fr";
    }
    return errors;
};

const UpdateAccount = (props) => {

    const { token } = useContext(LoginContext);

    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //VALIDATION ET REQUETE
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate,

        onSubmit: values => {

            axios.put("http://localhost:3000/api/auth/" + props.authId, {
                firstname: values.firstName,
                name: values.lastName,
                email: values.email,
            },  {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    handleClose();
                    history.push('/profile');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Vos informations on bien eté mise a jour.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Une erreur s'est produite lors de la modification",
                        footer: 'Essayer a nouveau, si cela persiste <a href="">contacter nous</a>'
                    })
                });
        },
    });


    return (
        <>
            <Button onClick={handleShow} title="modifier mes informations">
                <i className="fas fa-user-edit"></i>
            </Button>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Modifier mes informations</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <i className="fas fa-times-circle"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id="lastName"
                            className="form-control"
                            placeholder="Nom"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}

                        <input
                            id="firstName"
                            className="form-control"
                            placeholder="Prenom"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}

                        <input
                            id="email"
                            className="form-control"
                            placeholder="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}

                        <button type="submit" className="btn btn-primary">
                            <h3>valider</h3>
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateAccount;