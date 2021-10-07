import React from 'react';
import Navigation from './Navigation/Navigation';
import Classes from './header.module.css';

const Header = () => {
    return (
        <header className={["mb-3 border-bottom no-gutters", Classes.header].join(' ')}>
            <div className="container">
                <Navigation />
            </div>
        </header>
    );
};

export default Header;