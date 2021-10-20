import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import classes from "./navbar.module.css";


const NavBar = () => {

    return (
        <div className="navigation d-flex align-items-center justify-content-center justify-content-lg-start">
            <Navbar expand="lg">
                <LinkContainer exact to="/" className={["d-flex align-items-center mb-lg-0 text-dark text-decoration-none", classes.linkLogo].join(' ')}>
                    <Navbar.Brand>
                        <img src="./images/groupomania.png" alt="logo groupomania" className={classes.logo} />

                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={classes.menu}>
                    <Nav className="mr-auto">
                        <LinkContainer exact to="signup" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                <i className="fas fa-user-plus"></i>
                                M'inscrire
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="login" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                <i className="fas fa-sign-in-alt"></i>
                                Me Connecter
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}
export default NavBar;