import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Post from './Post/Post';
import AddPost from './addPost/AddPost';

const Home = (props) => {

    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages", {
            headers: { Authorization: `Bearer ${token}`},
        })
            .then((response) => {
                console.log(response);
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container id="home">
            <AddPost token={token} handleRefreshPost={getPosts} />
            {posts.map((post) => {
                return (
                    <Post key={post.id} post={post} />
                );
            })}
        </Container>
    );
};

export default Home;