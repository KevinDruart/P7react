import React from "react";
import LoginForm from "./LoginForm";
import classes from "../StylesForm/form.module.css"

const Login = (props) => (
    <div className={classes.formContainer}>
        <div className={classes.container}>
            <h2 className={["text-center", classes.form_title].join(' ')}>Se connecter</h2>
            <div className="d-flex flex-column">
                <LoginForm />
                <div className={classes.drop1}></div>
                <div className={classes.drop2}></div>
                <div className={classes.drop3}></div>
                <div className={classes.drop4}></div>
            </div>
        </div>
    </div>
);

export default Login;