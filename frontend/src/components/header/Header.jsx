import React, { useContext } from 'react';
import Classes from './header.module.css';
import NavBar from './Navigation/NavBar';
import NavBar2 from './Navigation/NavBar2';
import NavBarOnline from './Navigation/NavBarOnline';
import LoginContext from '../../contextes/LoginContext';

const Header = () => {
    const { isAuthenticated } = useContext(LoginContext);

    return (
        <header className={["border-bottom no-gutters fixed-top", Classes.header].join(' ')}>
            <div className={["container", Classes.containerHeader].join(' ')}>
            {isAuthenticated ? <NavBarOnline /> : <NavBar2 />}
            </div>
        </header>
    );
};

export default Header;