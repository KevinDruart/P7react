import React from 'react';
import Header from '../../components/Header/Header';
import classes from './erreur404.module.css';

const Error404 = () => {
    return (
        <div className={classes.erreur404}>
            <Header />

            <img src="./images/erreur404.png" alt="erreur page introuvable"/>
        </div>
    );
};

export default Error404;