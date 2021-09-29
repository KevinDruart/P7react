import React from 'react';
import Header from '../components/Header/Header';

const Error404 = () => {
    return (
        <div className="error404">
            <Header />

            <h1>404 not found</h1>
            <h2>Page introuvable</h2>
        </div>
    );
};

export default Error404;