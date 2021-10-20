import React from 'react';
import  Classes  from './footer.module.css';

const Footer = () => {
    return (
        <footer className={[Classes.footer]}>
            <div className="copyright"> Groupomania ©2021 - All right reserved.</div>
        </footer>
    );
};

export default Footer;