import React from "react";
import SignupForm from "./SignupForm";
import classes from "../StylesForm/form.module.css"

const Signup = (props) => (
    <div className={classes.formContainer}>
        <div className={classes.container}>
            <h2 className={["text-center", classes.form_title].join(' ')}>S'inscrire</h2>
            <div className="d-flex flex-column">
                <SignupForm />
                <div className={classes.drop1}></div>
                <div className={classes.drop2}></div>
                <div className={classes.drop3}></div>
                <div className={classes.drop4}></div>
            </div>
        </div>
    </div>
);

export default Signup;