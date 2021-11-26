import React from 'react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import axios from 'axios';
import classes from '../StylesForm/form.module.css';

const validate = values => {

    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Nom requis';
    } else if (!/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/i.test(values.firstName)) {
        errors.firstName ="Le prénom ne peut pas contenir de caractere numerique et ou speciaux";
    }

    if (!values.lastName) {
        errors.lastName = 'Prenom requis';
    } else if (!/^[a-zA-ZéèçîïÉÈÎÏ]+([-'\s][a-zA-ZéèçîïÉÈÎÏ]+)?$/i.test(values.lastName)) {
        errors.lastName ="Le nom ne peut pas contenir de caractere numerique et ou speciaux";
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

const SignupForm = () => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validate,

        onSubmit: values => {
            axios.post('http://localhost:3000/api/auth/signup', {
                firstName: values.firstName,
                name: values.lastName,
                email: values.email,
                password: values.password
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        console.log('inscription reussi');
                        history.push('/login');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={classes.formSignup}>
            <label htmlFor="firstName" className={classes.label}>Prénom</label>
            <input
                className={classes.input}
                placeholder="Prénom"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
                <div className={classes.error}>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName" className={classes.label}>Nom</label>
            <input
                className={classes.input}
                placeholder="Nom"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
                <div className={classes.error}>{formik.errors.lastName}</div>
            ) : null}

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

            <button type="submit" className={classes.input}>Submit</button>
        </form>
    );
};

export default SignupForm;