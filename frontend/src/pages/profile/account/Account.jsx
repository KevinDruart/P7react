import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



const Account = (props) => {

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
    return (
        <div>
            <Card style={{ width: '80%' }}>

                <Card.Header>Mes informations</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                </Card.Body>
                <Table striped bordered hover size="sm">

                    <tbody>
                        <tr>
                            <td>Prénom</td>
                            <td>{props.firstname}</td>
                            <td><Button variant="warning">Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>Nom</td>
                            <td>{props.name}</td>
                            <td><Button variant="warning">Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{props.email}</td>
                            <td><Button variant="warning">Modifier</Button></td>
                        </tr>
                        <tr>
                            <td>Vous êtes inscrit depuis: </td>
                            <td>{postTime}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Body>
                    <Button variant="danger">Supprimer mon compte</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Account;
