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
    const [filename, setFilename] = useState([]);
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
            sendPost();
        },
    });

    console.log(title);
    console.log(content);
    console.log(image);

    const sendPost = () => {
        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('upload', '');
        axios.post(
            ``, formData)
            .then((response) => {
                console.log(response);
                setFilename = response.data;
                axios.post("http://localhost:3000/messages", {
                    title: title,
                    content: content,
                    image: filename,
                    userId: userId,
                })
                    .then((response) => {
                        console.log(response.status);
                        console.log("post ajouter");
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    }

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
                        onChange={(event) => {setImage(event.target.files)}}
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