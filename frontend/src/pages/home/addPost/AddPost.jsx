import React from 'react';
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddPost = () => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: "onBlur" // "onChange"
    });
    const onSubmit = (data) => {
        console.log(data);
        axios.post('http://localhost:3000/api/auth/signup', {
            name: data.name,
            firstName: data.firstname,
            email: data.email,
            password: data.password
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log('Inscription reussi');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="messageSender">

        <div className="messageSender__top">
            <img className="user__avatar" src="./images/user.png" alt="" />
            <Form className="addPost">
                <input
                    id="addPostTitle"
                    className="messageSender__input"
                    placeholder="Titre de votre post"
                    type="text"

                />
                <input
                    id="addPostContent"
                    className="messageSender__input"
                    placeholder="Qu'avez vous envie de poster?"
                    type="text"

                />
                <div id="add-pictureInput">
                    <input
                        className="input-AddPicture"
                        type="file"
                        id="myFile"
                        name="filename"

                    />
                    <i className="far fa-times-circle close-pictureInput"></i>
                </div>
            </Form>
        </div>

        <div className="messageSender__bottom">

            <div className="messageSender__option" id="share">
                <i className="far fa-share-square"></i>
                <h3>Partager</h3>
            </div>
        </div>
    </div>
    );
};

export default AddPost;