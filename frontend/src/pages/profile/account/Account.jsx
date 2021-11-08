import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import LoginContext from '../../../contextes/LoginContext';



const Account = (props) => {
    const { userId, setUserId, setIsAdmin, setIsAuthenticated } = useContext(LoginContext);
    const uId = localStorage.getItem('authId');
    const token = localStorage.getItem('authToken');
    const [name, setName] = useState(props.name);
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState(props.email);

    const history = useHistory;

    console.log(props);

    const datePost = new Date(props.dateSignup);
    let postTime = datePost.toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    //SUPPRIMER LE COMPTE
    const handleDeleteMyAccount = (e) => {
        e.preventDefault();
        console.log("supprimer mon compte");
        if (userId === uId) {
            axios.delete("http://localhost:3000/api/auth/" + userId, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {

                    alert("Votre compte a bien etait supprimer, vous allez etre redirigé.");
                    localStorage.removeItem('authId');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('admin');
                    setIsAuthenticated(false);
                    setUserId(null);
                    setIsAdmin(false);
                    history.push('/');

                })
                .catch((error) => {
                    console.log('erreur suppresion du compte');
                });
        }
        else {
            alert('vous ne pouvez pas supprimer votre compte, contacter un administrateur')
        }
    }

    //MODIFIER NOM
    const handleUpdateName = (e) => {
        e.preventDefault();
        console.log("modifier mon nom");
        if (userId === uId) {
            axios.put("http://localhost:3000/api/auth/" + userId, name, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {

                    alert("Votre nom a bien etait modifier, vous allez etre redirigé.");

                })
                .catch((error) => {
                    console.log('erreur modification nom');
                });
        }

    }

    //MODIFIER PRENOM
    const handleUpdateFirstname = (e) => {
        e.preventDefault();
        console.log(firstname);
        console.log("modifier mon prénom");
        if (userId === uId) {
            axios.put("http://localhost:3000/api/auth/" + userId, firstname, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    alert("Votre prenom a bien etait modifier");
                })
                .catch((error) => {
                    console.log('erreur modification prenom');
                });
        }
    }
    //MODIFIER EMAIL
    const handleUpdateEmail = (e) => {
        e.preventDefault();
        console.log("modifier mon email");
        if (userId === uId) {
            axios.put("http://localhost:3000/api/auth/" + userId, email, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    alert("Votre email a bien etait modifier");
                })
                .catch((error) => {
                    console.log('erreur modification email');
                });
        }
    }

    return (
        <div>
            <Card style={{ width: '90%' }}>

                <Card.Header>Mes informations</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                </Card.Body>
                <Table striped bordered hover size="sm">

                    <tbody>
                        <tr>
                            <td>Prénom</td>
                            <td>{props.firstname}</td>

                            <td className="form-floating">
                                <input type="text" class="form-control" id="updateFirstname" placeholder="Modifier" onChange={(e) => { setFirstname(e.target.value) }} />
                                <label htmlfor="updateFirstname">Prénom</label>
                            </td>
                            <td><Button variant="warning" onClick={handleUpdateFirstname}>Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>Nom</td>
                            <td>{props.name}</td>
                            <td className="form-floating">
                                <input type="text" class="form-control" id="updateName" placeholder="Modifier" onChange={(e) => { setName(e.target.value) }} />
                                <label htmlfor="updateName">nom</label>
                            </td>
                            <td><Button variant="warning" onClick={handleUpdateName}>Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{props.email}</td>
                            <td className="form-floating">
                                <input type="text" class="form-control" id="updateEmail" placeholder="Modifier" onChange={(e) => { setEmail(e.target.value) }} />
                                <label htmlfor="updateEmail">Email</label>
                            </td>
                            <td><Button variant="warning" onClick={handleUpdateEmail}>Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>Vous êtes inscrit depuis: </td>
                            <td>{postTime}</td>

                        </tr>
                    </tbody>
                </Table>
                <Card.Body>
                    <Button variant="danger" onClick={handleDeleteMyAccount}>Supprimer mon compte</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Account;
