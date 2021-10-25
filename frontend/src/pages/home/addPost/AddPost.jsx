import React, { useContext, useState } from 'react';
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

            const data = new FormData();
            data.append('image', image);
            data.append('title', title);
            data.append('content', content);
            data.append('userId', userId);

            console.log(data);

            axios.post("http://localhost:3000/api/messages", data, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {
                    
                    response.status(200).json({message : 'post ajouté'});
                })
                .catch((error) => {
                    console.log('erreur ajout post');
                });
        },
    });

    console.log(title);
    console.log(content);
    console.log(image);

    return (

        <div className="messageSender">
            <div className="messageSender__top">
                <img className="user__avatar" src="./images/user.png" alt="" />
                <form onSubmit={formik.handleSubmit} className="addPost">

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