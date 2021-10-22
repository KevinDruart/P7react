import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../../contextes/LoginContext';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Post from '../home/Post/Post';
import Account from './account/Account';
import classes from './profil.module.css';


const Profile = () => {

    const { isAuthentificated } = useContext(LoginContext);
    const { userId } = useContext(LoginContext);

    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getProfile();
        getPosts();
    }, [])

    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages/post/" + userId, {
            userId: userId
        })
            .then((response) => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getProfile = () => {
        axios
            .get("http://localhost:3000/api/auth/" + userId, {
                userId: userId
            })
            .then((response) => {
                console.log(response.data[0]);
                setUser(response.data[0]);
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
                );
            });
    };

    return (
        <div className={classes.profil}>
            <div className='headerProfil'>
                <h1 className={classes.titleProfil}>Mon profil</h1>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Mon compte</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Mes posts</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Account {...user} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {posts.map((post) => {
                                    return (
                                        <Post key={post.numPost} {...post} />
                                    );
                                })}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    );
};

export default Profile;