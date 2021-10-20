import React, { useContext } from 'react';
import Classes from './header.module.css';
import NavBar from './Navigation/NavBar';
import NavBarOnline from './Navigation/NavBarOnline';
import LoginContext from '../../contextes/LoginContext';

const Header = () => {
    const { isAuthentificated } = useContext(LoginContext);

    return (
        <header className={["border-bottom no-gutters fixed-top", Classes.header].join(' ')}>
            <div className={["container", Classes.containerHeader].join(' ')}>
            {isAuthentificated ? <NavBarOnline /> : <NavBar />}
            </div>
        </header>
    );
};

export default Header;