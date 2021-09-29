import React from 'react';
import Header from '../components/Header/Header';
import Communication from '../images/communication.png';
import Classes from './Index/index.module.css';


const Index = () => {
    return (
        <div className="home">
            <Header />
            <div class="px-4 pt-5 text-center">
                <h1 class="display-4 fw-bold">La communauté Groupomania</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="lead mb-4">
                    Avec de bonnes relations professionnelles, le travail est plus agréable et nous sommes tous plus motivé et productif.<br />
                     Partager, dialoguer avec tout vos collegues et connaitre leurs idées ainsi que leurs opinions..<br />
                     Tellement de possibilités grace à l'espace de communication Groupomania.
                    </p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <button type="button" class={["btn btn-lg px-4 me-sm-", Classes.btnGroupomania].join(' ')}>Me connecter</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">M'inscrire</button>
                    </div>
                </div>
                <div class="overflow-hidden">
                    <div class={["container px-5", Classes.communication].join(' ')}>
                        <img src={ Communication } class="img-fluid border rounded-3 shadow-lg mb-4" alt="communication" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Index;