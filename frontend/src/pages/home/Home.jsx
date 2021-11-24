//import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import elements
import Post from './Post/Post';
import AddPost from './Post/addPost/AddPost';

//import element react bootstrap
import Container from "react-bootstrap/Container";

//import classe css
import classes from './home.module.css';

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    //recuperation du token user
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        getPosts();
    }, [])

    //requete pour recuperer les posts
    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container className={classes.home} id="home">
            <AddPost token={token} handleRefreshPost={getPosts} />
            {posts.map((post) => {
                return (
                    <div className={classes.cardPost} key={post.id}>
                        <Post post={post} token={token} />
                    </div>
                );
            })}
        </Container>
    );
};

export default Home;