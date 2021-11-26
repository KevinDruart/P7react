import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import classes from "./navbar.module.css";


const NavBar = () => {

    return (

            <Navbar expand="sm" className={classes.navbar}>
                <LinkContainer exact to="/" className={["d-flex align-items-center mb-lg-0 text-dark text-decoration-none", classes.linkLogo].join(' ')}>
                <Navbar.Brand>
                        <div className={classes.imageLogo}>
                            <img src="./images/icon.png" alt="logo groupomania" className={classes.logo} />
                        </div>

                        <h1 className={classes.name}>Groupomania</h1>

                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={classes.menu}>
                    <Nav className="mr-auto">
                        <LinkContainer exact to="signup" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                {/* <i className="fas fa-user-plus"></i> */}
                                M'inscrire
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="login" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                {/* <i className="fas fa-sign-in-alt"></i> */}
                                Me Connecter
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

    );

}
export default NavBar;