import React from 'react';
import Logo from '../../images/groupomania.png';
import User from '../../images/user.png';

const HeaderOnline = () => {
    return (
        <header class="p-3 mb-3 border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="home.html" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <img src={ Logo } alt="logo groupomania" />
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                    <li class="d-flex flex-column align-items-center">
                        <i class="fas fa-plus"></i>
                        <a href="#" class="nav-link px-2 link-dark">Ajouter un post</a>
                    </li>
                </ul>


                <div class="dropdown text-end">
                    <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={ User } alt="" width="32" height="32"
                            class="rounded-circle"/>
                    </a>
                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">Mon profil</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" href="#" id="signout">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    );
};

export default HeaderOnline;