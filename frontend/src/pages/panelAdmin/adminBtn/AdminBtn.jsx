import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from "react-router-bootstrap";
import classes from "../../../components/Header/Navigation/navbar.module.css";

const AdminBtn = () => {

    return (
        <LinkContainer exact to="/admin" className="d-flex flex-column align-items-center">
            <Nav.Link className={classes.link}>
                <i className="fas fa-tools"></i>
                Admin
            </Nav.Link>
        </LinkContainer>
    );
};

export default AdminBtn;