import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import LoginContext from '../../contextes/LoginContext';

//import des elements react-bootstrap
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

//import des components
import Post from '../home/Post/Post';
import Account from './account/Account';

//import des classes css
import classes from './profil.module.css';


const Profile = () => {

    const token = localStorage.getItem('authToken');
    const { userId } = useContext(LoginContext);

    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getProfile();
        getPosts();
    }, [])

    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages/post/" + userId, {
            headers: { Authorization: `Bearer ${token}`},
        })
            .then((response) => {
                setPosts(response.data);
            })
            .catch(error => {
                return null;
            })
    }

    const getProfile = () => {
        axios
            .get("http://localhost:3000/api/auth/" + userId, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((response) => {
                setUser(response.data[0]);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Une erreur s'est produite",
                    footer: 'Essayer a nouveau, si cela persiste <a href="">contacter nous</a>'
                  })
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
                                <Nav.Link className={classes.tabs} eventKey="first">Mon compte</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={classes.tabs} eventKey="second">Mes posts</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Account 
                                userId={userId}
                                authToken={token}
                                name={user.name} 
                                firstname={user.firstname} 
                                email={user.emailMasked} 
                                date={user.dateSignup}     
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {posts.map((post) => {
                                    return (
                                        <Post key={post.id} post={post} handleRefreshPost={getPosts}/>
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