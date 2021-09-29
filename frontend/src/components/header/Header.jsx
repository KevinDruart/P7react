import React from 'react';
import Logo from '../../images/groupomania.png';

const Header = () => {
    return (
        <header class="p-3 mb-3 border-bottom no-gutters">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="#" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <img src={Logo} alt="logo groupomania" />
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                    <li class="d-flex flex-column align-items-center">
                        <i class="fas fa-plus"></i>
                        <a href="#" class="nav-link px-2 link-dark">M'inscrire</a>
                    </li>
                    <li class="d-flex flex-column align-items-center">
                        <i class="fas fa-plus"></i>
                        <a href="#" class="nav-link px-2 link-dark">Me connecter</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    );
};

export default Header;