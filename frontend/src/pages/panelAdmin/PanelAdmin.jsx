import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';


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
                return null;
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
                return null;
            })
    }
    return (

        <div className={classes.PanelAdmin}>
            <div className={classes.PanelAdmin_Top}>
                <h2>Informations rapide:</h2>
                <div className={classes.PanelAdmin_Top_info}>
                    <div>
                        <p>
                            Nombre de Membres:
                            <span className="badge bg-success">
                                {nbUsers}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Nombre de posts:
                            <span className="badge bg-success">
                                {nbPosts}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="Membres" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Posts" title="Posts">
                    <table className={classes.tableAdmin}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prenom</th >
                                <th>Titre</th>
                                <th>message</th>
                                <th>post?? le</th>
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
                    </table>
                </Tab>
                <Tab eventKey="Membres" title="Membres">
                    <table className={classes.tableAdmin}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>email</th>
                                <th>date d'inscription</th>
                                <th>R??le</th>
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
                    </table>
                </Tab>

            </Tabs>
        </div>
    );
};

export default PanelAdmin;