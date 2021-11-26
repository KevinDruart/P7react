import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import classes from "./navbar.module.css";


const NavBar = () => {

  return (

    <nav class={["navbar navbar-expand-md navbar-light", classes.navbar].join(' ')}>
      <div class="container-fluid">
        <LinkContainer exact to="/" className={["d-flex align-items-center mb-lg-0 text-dark text-decoration-none", classes.linkLogo].join(' ')}>
          <Navbar.Brand>
            <div className={classes.imageLogo}>
              <img src="./images/icon.png" alt="logo groupomania" className={classes.logo} />
            </div>
            <h1 className={classes.name}>Groupomania</h1>
          </Navbar.Brand>
        </LinkContainer>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <LinkContainer exact to="signup" className="d-flex flex-column align-items-center">
                <Nav.Link className={classes.link}>
                  <i className="fas fa-user-plus"></i>
                  Inscription
                </Nav.Link>
              </LinkContainer>
            </li>
            <li class="nav-item">
              <LinkContainer exact to="login" className="d-flex flex-column align-items-center">
                <Nav.Link className={classes.link}>
                  <i className="fas fa-sign-in-alt"></i>
                  Connexion
                </Nav.Link>
              </LinkContainer>
            </li>

          </ul>

        </div>
      </div>
    </nav>

  );

}
export default NavBar;