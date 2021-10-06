import React from 'react';
import { NavLink } from 'react-router-dom';
import Classes from './login.module.css';



const Login = () => {
    return (


        <div className={[Classes.login]}>
     
            <main className={[Classes.form_signin]}>
                <form className={[Classes.formLogin]}>

                    <h1 className={["h3 mb-3 fw-normal", Classes.title].join(' ')} >Connexion</h1>

                    <div className={[Classes.form_floating]}>
                        <label for="floatingInput">Adresse email</label>
                        <input type="email" className="form-control" id="floatingInput" placeholder="email@groupomania.fr" />

                    </div>
                    <div className={[Classes.form_floating]}>
                        <label for="floatingPassword">Mot de passe</label>
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Mot de passe" />

                    </div>
                    <p>Vous n'êtes pas encore membre? <NavLink to="s-inscrire" exact className={[Classes.linkLogin]}> Inscrivez vous</NavLink></p>

                    <button className={["btn btn-lg", Classes.submit].join(' ')} type="submit">Me Connecter</button>
                </form>
            </main>
        </div >

    );
};

export default Login;