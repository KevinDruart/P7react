import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import classes from '../../StylesForm/form.module.css';


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
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([])

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

                })
                .catch((error) => {
                    console.log('erreur ajout post');
                });
        },
    });

    return (

        <div className="messageSender">
            <div className="messageSender__top">
                <img className="user__avatar" src="./images/user.png" alt="" />
                <form onSubmit={formik.handleSubmit} className="addPost">

                    <input
                        className={classes.input}
                        id="addPostTitle"
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

                    <input
                        className="Parcourir"
                        type="file"
                        onChange={(event) => { setImage(event.target.files) }}
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