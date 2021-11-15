import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import classes from "./navbar.module.css";
import LoginContext from '../../../contextes/LoginContext';
import AdminBtn from '../../../pages/panelAdmin/adminBtn/AdminBtn';

const NavBarOnline = () => {

    const { setIsAuthenticated, setUserId, isAdmin, setIsAdmin } = useContext(LoginContext);
    const history = useHistory;

    const handleLogout = () => {
        alert("Vous êtes maintenant déconnecter");
        localStorage.removeItem('authId');
        localStorage.removeItem('authToken');
        localStorage.removeItem('admin');
        setIsAuthenticated(false);
        setUserId(null);
        setIsAdmin(false);
        history.push('/');
    }

    return (
        <div className="navigation d-flex align-items-center justify-content-center justify-content-lg-start">
            <Navbar expand="lg">
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
                        <LinkContainer exact to="/home" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                <i className="fas fa-home"></i>
                                Accueil
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer exact to="/profile" className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                <i className="fas fa-user-alt"></i>
                                Mon profil
                            </Nav.Link>
                        </LinkContainer>

                        {isAdmin ? <AdminBtn /> : null}

                        <LinkContainer exact to="/" onClick={handleLogout} className="d-flex flex-column align-items-center">
                            <Nav.Link className={classes.link}>
                                <i className="fas fa-sign-out-alt"></i>
                                Me deconnecter
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBarOnline;