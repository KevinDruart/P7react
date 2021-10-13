import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";

import Post from './Post/Post';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages")
            .then((response) => {
                setPosts(response.data);
            })

    }

    return (
        <Container id="home">
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
            {posts.map((post) => {
                return (
                    <Post key={post.id} {...post} />
                );
            })}




        </Container>

    );
};

export default Home;