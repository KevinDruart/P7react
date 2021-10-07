import React from 'react';

import { withFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import { Route } from 'react-router';
import Home from '../home/Home';




const Connexion = (props) => {
    return (
        <div className="container">
            <Form className="mt-5 d-flex flex-column content-center">

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
        email: "",
        password: ""
    }),
    validationSchema: Yup.object().shape({
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

        axios.post('http://localhost:3000/api/auth/login', {

            email: values.email,
            password: values.password
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    <Route path="/home" exact component={Home} />
                    console.log('vous etes connecter');
                }
                else {
                    console.log('connexion impossible');
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
})(Connexion);