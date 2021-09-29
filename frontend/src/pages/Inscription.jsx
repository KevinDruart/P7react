import React from 'react';
import Header from '../components/Header/Header';


const Inscription = () => {
    return (
        <div className="inscritpion">
            <Header />
            <h1>Inscription</h1>
            <form>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" placeholder="Nom" />
                </div>
                <div className="form-group">
                    <label>Prenom</label>
                    <input type="text" className="form-control" placeholder="Prènom" />
                </div>
                <div className="form-group">
                    <label>adresse email</label>
                    <input type="email" className="form-control" placeholder="adresse email" />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="mot de passe" />
                </div>
                <button>m'inscrire</button>
            </form>
        </div>
    );
};

export default Inscription;