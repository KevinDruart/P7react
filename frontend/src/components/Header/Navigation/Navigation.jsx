import React from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
    return (
        <div className="navigation d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <NavLink exact to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                <img src="./images/groupomania.png" alt="logo groupomania" />
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                <li className="d-flex flex-column align-items-center">
                    <NavLink exact to="s-inscrire" 
                    className="d-flex flex-column nav-link px-2 link-dark align-items-center">
                    <i className="fas fa-user-plus"></i>
                    M'inscrire
                    </NavLink>
                </li>
                <li className="d-flex flex-column align-items-center">
                    
                    <NavLink exact to="se-connecter" 
                    className="d-flex flex-column nav-link px-2 link-dark align-items-center">
                    <i className="fas fa-sign-in-alt"></i>
                    Me Connecter
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;