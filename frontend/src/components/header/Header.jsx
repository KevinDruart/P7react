import React from 'react';
import Classes from './header.module.css';
import NavBar from './Navigation/NavBar';

const Header = () => {
    return (
        <header className={["border-bottom no-gutters fixed-top", Classes.header].join(' ')}>
            <div className={["container", Classes.containerHeader].join(' ')}>
                <NavBar />
            </div>
        </header>
    );
};

export default Header;