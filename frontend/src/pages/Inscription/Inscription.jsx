import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import InscriptionForm from "./InscriptionForm/InscriptionForm";
import { Route } from "react-router-dom";

class Contact extends Component {
    render() {

        return (
            <Container className="text-center">
                <h1>Vous souhaitez vous inscrire</h1>
                <div>
                    <h2>C'est trés simple</h2>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <i className="far fa-hand-point-down"></i>
                        Etape 1: Tu clique sur le bouton ci-dessous
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <i className="fas fa-edit"></i>
                        Etape 2: Tu rempli le formulaire
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <i className="fas fa-clipboard-check"></i>
                        Etape 3: Tu peut te connecter et dialoguer avec tout tes collègues
                        </ListGroup.Item>
                    </ListGroup>


                </div>
                <LinkContainer to={this.props.match.path + "/form"}>
                    <Button variant="primary">Je m'inscris</Button>
                </LinkContainer>
                <Route path={this.props.match.path + "/form"} render={(props) => <InscriptionForm />} />
            </Container>
        );
    }
}

export default Contact;