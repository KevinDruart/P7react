import React from 'react';
import { NavLink } from 'react-router-dom';
import Classes from './index.module.css';


const Index = () => {
    return (
        <div className={Classes.index}>
            <div className="px-4 text-center">
                <h1 className={["display-4 fw-bold", Classes.title].join(' ')}>La communauté Groupomania</h1>
                <div className="col-lg-6 mx-auto">
                    <p className= {["lead mb-4", Classes.describe].join(' ')}>
                    Avec de bonnes relations professionnelles, le travail est plus agréable et nous sommes tous plus motivé et productif.<br />
                     Partager, dialoguer avec tout vos collegues et connaitre leurs idées ainsi que leurs opinions..<br />
                     Tellement de possibilités grace à l'espace de communication Groupomania.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <NavLink to="login" exact type="button" className={["btn btn-lg px-4 me-sm-", Classes.btnLogin].join(' ')}>Me connecter</NavLink>
                        <NavLink to="signup" exact type="button" className={["btn btn-lg px-4 me-sm-", Classes.btnSignup].join(' ')}>M'inscrire</NavLink>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className={["container px-5", Classes.communication].join(' ')}>
                        <img src='./images/communication.png' className="img-fluid border rounded-3 shadow-lg mb-4" alt="communication" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Index;