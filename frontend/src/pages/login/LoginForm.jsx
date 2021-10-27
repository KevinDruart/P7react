import React, { useContext } from 'react';
import { useHistory } from "react-router";
import { useFormik } from 'formik';
import axios from 'axios';
import classes from '../StylesForm/form.module.css';

import LoginContext from '../../contextes/LoginContext';

const validate = values => {
    const errors = {};

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

const LoginForm = () => {

    const { setIsAuthenticated, setUserId } = useContext(LoginContext);

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,

        onSubmit: values => {
            console.log(values.email + values.password);
            axios.post('http://localhost:3000/api/auth/login', {
                email: values.email,
                password: values.password
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        console.log('connexion reussi');
                        if (response.data) {
                            localStorage.setItem("authToken", response.data.token);
                            localStorage.setItem("authId", response.data.userId);
                            setIsAuthenticated(true);
                            setUserId(response.data.userId);
                            history.push("/home");
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={classes.form}>

            <label htmlFor="email" className={classes.label}>Adresse email</label>
            <input
                className={classes.input}
                placeholder="Adresse email"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className={classes.error}>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password" className={classes.label}>Mot de passe</label>
            <input
                className={classes.input}
                placeholder="Mot de passe"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className={classes.error}>{formik.errors.password}</div>
            ) : null}

            <button type="submit" className={classes.input}>Me connecter</button>
            <p className={classes.recoverPass}>Mot de passe oublié</p>
        </form>
    );
};


export default LoginForm;