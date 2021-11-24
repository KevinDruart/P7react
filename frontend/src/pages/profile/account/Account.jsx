import React, { useContext } from 'react';
import { useHistory } from 'react-router';

//Import des elements bootstrap
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import LoginContext from '../../../contextes/LoginContext';

//Import des components
import UpdateAccount from './updateAccount/UpdateAccount';
import DeleteAccount from './deleteAccount/DeleteAccount';



const Account = (props) => {
    const { userId } = useContext(LoginContext);


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
                    <Container className="messageSender__top">
                        <ButtonGroup>
                            <UpdateAccount
                                authId={userId}
                                authToken={props.token}
                                userId={props.userId}
                                oldName={props.name}
                                oldFirstname={props.firstname}
                                oldEmail={props.email}
                            />
                            <DeleteAccount
                                authId={userId}
                                authToken={props.token}
                                userId={props.userId}
                            />
                        </ButtonGroup>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Account;
