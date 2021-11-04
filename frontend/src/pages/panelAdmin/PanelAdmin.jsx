import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

import ListPostAdmin from './listAdmin/ListPostAdmin';
import ListUserAdmin from './listAdmin/ListUserAdmin';

import classes from './panelAdmin.module.css';

const PanelAdmin = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [nbPosts, setNbPosts] = useState('');
    const [nbUsers, setNbUsers] = useState('');

    //recuperation du token user
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        getPosts();
        getUsers();
    }, [])

    //requete pour recuperer les posts
    const getPosts = () => {
        axios.get("http://localhost:3000/api/messages", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setPosts(response.data);
                setNbPosts(response.data.length);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //requete pour recuperer les utilisateur
    const getUsers = () => {
        axios.get("http://localhost:3000/api/auth/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setUsers(response.data);
                setNbUsers(response.data.length);
            })
            .catch(error => {
                console.log(error);
            })
    }
    console.log(users);
    return (

        <Container className={classes.PanelAdmin}>
            <div className={classes.PanelAdmin_Top}>
                <h2>Informations rapide:</h2>
                <div className={classes.PanelAdmin_Top_info}>
                    <div>
                        <p>
                            Nombre de Membres:
                            <span class="badge bg-success">
                                {nbUsers}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Nombre de posts:
                            <span class="badge bg-success">
                                {nbPosts}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="Membres" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Posts" title="Posts">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Titre</th>
                                <th>message</th>
                                <th>posté le</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <ListPostAdmin
                                            postId={post.id}
                                            name={post.name}
                                            firstname={post.firstname}
                                            title={post.title}
                                            content={post.content}
                                            time={post.time_post}
                                        />
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="Membres" title="Membres">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>email</th>
                                <th>date d'inscription</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <ListUserAdmin
                                            userId={user.id}
                                            name={user.name}
                                            firstname={user.firstname}
                                            email={user.emailMasked}
                                            time={user.dateSignup}
                                            roles={user.roles}
                                        />
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Tab>

            </Tabs>
        </Container>
    );
};

export default PanelAdmin;