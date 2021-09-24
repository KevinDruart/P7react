import React from 'react';
import './sign.scss';



export default function sign() {
    return (
        <div className="sign-container">
            <img src="images/groupomania.png" alt="logo groupomania" className="logo" />
            <div className="sign-content-block">
                <div className="left">

                    <h3>Me connecter</h3>
                    <div className="form-group">
                        <label>Adresse email</label>
                        <input type="email" className="form-control" placeholder="adresse email" />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input type="password" className="form-control" placeholder="mot de passe" />
                    </div>
                    <button>Connexion</button>

                </div>
                <div className="right">
                    <h3>M'inscrire</h3>
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

                </div>
            </div>
        </div>
    )
}
