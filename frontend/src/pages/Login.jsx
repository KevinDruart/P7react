import React from 'react';
import Header from '../components/Header/Header';


const Login = () => {
    return (
        <div className="login">
            <Header />
            <form>
                <div className="form-group">
                    <label>Adresse email</label>
                    <input type="email" className="form-control" placeholder="adresse email" />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="mot de passe" />
                </div>
                <button>Connexion</button>
            </form>

        </div >
    );
};

export default Login;