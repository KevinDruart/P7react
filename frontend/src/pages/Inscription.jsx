import React from 'react';
import Header from '../components/Header/Header';
import Classes from './login/login.module.css';

const Inscription = () => {
    return (
        <div className={[Classes.inscription]}>
            <Header />

            <main class={[Classes.form_signin]}>

                <form className={[Classes.formLogin]}>
                    <h1 className={["h3 mb-3 fw-normal", Classes.title].join(' ')}>Inscription</h1>
                    <div class={[Classes.form_floating]}>
                        <label for="floatingNameInput">Nom</label>
                        <input type="text" class="form-control" id="floatingNameInput" placeholder="Nom" />

                    </div>
                    <div class={[Classes.form_floating]}>
                        <label for="floatingFirstnameInput">Prénom</label>
                        <input type="text" class="form-control" id="floatingFirstnameInput" placeholder="Prénom" />

                    </div>
                    <div class={[Classes.form_floating]}>
                        <label for="floatingInput">Adresse email</label>
                        <input type="email" class="form-control" id="floatingInput" placeholder="email@groupomania.fr" />

                    </div>
                    <div class={[Classes.form_floating]}>
                        <label for="floatingInput">Mot de passe</label>
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Mot de passe" />

                    </div>
                    <button className={["btn btn-lg", Classes.submit].join(' ')} type="submit">m'inscrire</button>
                </form>
            </main>
        </div>
    );
};

export default Inscription;