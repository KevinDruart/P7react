import React, { useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import classes from '../../StylesForm/form.module.css';
import LoginContext from '../../../contextes/LoginContext';

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

const AddPost = () => {

    const { userId } = useContext(LoginContext);

    const formik = useFormik({
        initialValues: {
            addPostTitle: '',
            addPostContent: '',

        },
        validate,

        onSubmit: values => {
            console.log(userId);
            console.log(values);
            axios.post('http://localhost:3000/api/messages', {
                userId: userId,
                title: values.addPostTitle,
                message: values.addPostContent,
            })
                .then(function (response) {

                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });
    return (

        <div className="messageSender">

            <div className="messageSender__top">
                <img className="user__avatar" src="./images/user.png" alt="" />
                <form onSubmit={formik.handleSubmit} className="addPost">

                    <label htmlFor="addPostTitle" className={classes.label}>Adresse email</label>
                    <input
                        className={classes.input}
                        id="addPostTitle"
                        className="messageSender__input"
                        placeholder="Titre de votre post"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.addPostTitle}
                    />
                    {formik.touched.addPostTitle && formik.errors.addPostTitle ? (
                        <div className={classes.error}>{formik.errors.addPostTitle}</div>
                    ) : null}

                    <label htmlFor="addPostContent" className={classes.label}>Mot de passe</label>
                    <input
                        id="addPostContent"
                        className="messageSender__input"
                        placeholder="Qu'avez vous envie de poster?"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.addPostContent}
                    />
                    {formik.touched.addPostContent && formik.errors.addPostContent ? (
                        <div className={classes.error}>{formik.errors.addPostContent}</div>
                    ) : null}

                    <label htmlFor="password" className={classes.label}>Image</label>
                    <input
                        className="input-AddPicture"
                        type="file"
                        id="myFile"
                        name="filename"

                    />
                    <button type="submit" className={classes.input}>
                        <i className="far fa-share-square"></i>
                        <h3>Partager</h3>
                    </button>
                </form>
            </div>
        </div>
    );
};


export default AddPost;