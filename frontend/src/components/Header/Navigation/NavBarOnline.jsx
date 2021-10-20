import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";
import classes from "./navbar.module.css";

const NavBarOnline = () => {

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
                    <Nav className="mr-auto d-flex flex-column justify-content-center align-items-center">
                        <i className="fas fa-cogs"></i>
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                        <LinkContainer exact to="home">
                                <NavDropdown.Item>Accueil</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer exact to="/profile">
                                <NavDropdown.Item>Mon profil</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer exact to="/logout">
                                <NavDropdown.Item>Me déconnecter</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBarOnline;