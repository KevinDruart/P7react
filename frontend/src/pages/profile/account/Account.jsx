import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import LoginContext from '../../../contextes/LoginContext';
import UpdateAccount from './updateAccount/UpdateAccount';



const Account = (props) => {
    const { setUserId, setIsAdmin, setIsAuthenticated } = useContext(LoginContext);
    const uId = localStorage.getItem('authId');

    const history = useHistory;

    const datePost = new Date(props.date);
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
        if (props.userId === uId) {
            axios.delete("http://localhost:3000/api/auth/" + props.userId, {
                headers: { Authorization: `Bearer ${props.token}` },
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
                        </tr>
                        <tr>
                            <td>Nom</td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{props.email}</td>
                        </tr>
                        <tr>
                            <td>Vous êtes inscrit depuis: </td>
                            <td>{postTime}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Body className="d-flex">
                    <Button variant="danger" title="Supprimer mon compte" onClick={handleDeleteMyAccount}>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                    <UpdateAccount
                        authId={uId}
                        authToken={props.token}
                        userId={props.userId}
                        oldName={props.name}
                        oldFirstname={props.firstname}
                        oldEmail={props.email}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};

export default Account;
