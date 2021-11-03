import React from 'react';

import classes from './configPost.module.css';

const ConfigPost = (props) => {
    return (
        <div className={classes.manageBtn}>
            <i className="fas fa-pencil-alt"></i>
            <i className="fas fa-trash-alt"></i>
        </div>
    );
};

export default ConfigPost;