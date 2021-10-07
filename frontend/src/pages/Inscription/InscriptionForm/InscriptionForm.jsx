import React from 'react';

import { withFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";



const Inscription = (props) => {
    return (
        <div className="container">
            <Form className="mt-5 d-flex flex-column content-center">
                <Form.Group controlId="nom">
                    <Form.Label>Nom</Form.Label><Badge variant="warning">(min 5 caractères)</Badge>
                    <Form.Control
                        type="text"
                        placeholder="Votre nom"
                        name="nom"
                        onChange={props.handleChange}
                        value={props.values.nom}
                        onBlur={props.handleBlur}
                    />
                    {
                        props.touched.nom && props.errors.nom && <span style={{ color: "red" }}>{props.errors.nom}</span>
                    }
                </Form.Group>
                <Form.Group controlId="prenom">
                    <Form.Label>Prénom</Form.Label><Badge variant="warning">(min 5 caractères)</Badge>
                    <Form.Control
                        type="text"
                        placeholder="Votre prénom"
                        name="prenom"
                        onChange={props.handleChange}
                        value={props.values.prenom}
                        onBlur={props.handleBlur}
                    />
                    {
                        props.touched.prenom && props.errors.prenom && <span style={{ color: "red" }}>{props.errors.prenom}</span>
                    }
                </Form.Group>
                <Form.Group controlId="mail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Votre Email"
                        name="email"
                        onChange={props.handleChange}
                        value={props.values.email}
                        onBlur={props.handleBlur}
                    />
                    {
                        props.touched.email && props.errors.email && <span style={{ color: "red" }}>{props.errors.email}</span>
                    }
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Votre mot de passe</Form.Label><Badge variant="warning">(le mot de passe doit contenir:)</Badge>
                    <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        onChange={props.handleChange}
                        value={props.values.password}
                        onBlur={props.handleBlur}
                    />
                    {
                        props.touched.password && props.errors.password && <span style={{ color: "red" }}>{props.errors.password}</span>
                    }
                </Form.Group>
                <Button variant="primary" onClick={props.handleSubmit}>
                    Valider
                </Button>
            </Form>

        </div>
    );
};

export default withFormik({
    mapPropsToValues: () => ({
        nom: "",
        prenom: "",
        email: "",
        password: ""
    }),
    validationSchema: Yup.object().shape({
        nom: Yup.string()
            .min(5, 'Le nom doit avoir plus de 5 caractères')
            .matches(/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/)
            .required("Le nom est obligatoire!"),
        prenom: Yup.string()
            .min(5, 'Le nom doit avoir plus de 5 caractères')
            .matches(/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/)
            .required("Le prénom est obligatoire!"),
        email: Yup.string()
            .email("L'email n'a pas le bon format")
            .matches(/^[\w-ç\.]+@groupomania\.fr$/)
            .required("L'email est obligatoire !"),
        password: Yup.string()
            .min(8, "Le message doit faire plus de 8 caractères")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .required("Le mot de passe est obligatoire !")
    }),
    handleSubmit: (values, { props }) => {
        console.log(values);

        axios.post('http://localhost:3000/api/auth/signup', {
            name: values.nom,
            firstName: values.prenom,
            email: values.email,
            password: values.password
        })
            .then(function (response) {
if (response.status === 200) {
    console.log('Inscription reussi');
}

            })
            .catch(function (error) {
                console.log(error);
            });

    }
})(Inscription);