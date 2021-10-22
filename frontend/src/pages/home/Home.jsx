import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Post from './Post/Post';
import AddPost from './addPost/AddPost';

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages")
            .then((response) => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container id="home">
            <AddPost />
            {posts.map((post) => {
                return (
                    <Post key={post.numPost} {...post} />
                );
            })}
        </Container>
    );
};

export default Home;