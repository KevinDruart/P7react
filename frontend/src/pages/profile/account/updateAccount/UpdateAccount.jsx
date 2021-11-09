import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useFormik } from 'formik';

//Import elements react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

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
    if (!values.password) {
        errors.password = 'Mot de passe requis';
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(values.password)) {
        errors.password = "Le mot de passe doit contenir une majuscule, une minuscule, 1 chiffre au minimum et avoir 8 caractere minimum";
    }
    return errors;
};

const UpdateAccount = (props) => {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate,

        onSubmit: values => {
            axios.put("http://localhost:3000/api/auth/" + props.uId, {
                firstName: values.firstName,
                name: values.lastName,
                email: values.email,
            }, {
                headers: { Authorization: `Bearer ${props.authToken}` },
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });

    return (
        <Container className="messageSender__top">
            <Button onClick={handleShow} title="Modifier mes informations">
                <i className="fas fa-user-edit"></i>
            </Button>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Modifier mes données personnelle</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <i className="fas fa-times-circle"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input
                            className="form-control"
                            placeholder="Nom"
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}

                        <label htmlFor="firstname" className="form-label">Prénom</label>
                        <input

                            className="form-control"
                            placeholder="Prénom"
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}

                        <label htmlFor="email" className="form-label">Email</label>
                        <input

                            className="form-control"
                            placeholder="Adresse email"
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div >{formik.errors.email}</div>
                        ) : null}

                        <Button variant="primary" type="submit" className="btn" >Valider</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default UpdateAccount;