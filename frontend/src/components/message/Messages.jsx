import React from 'react';


const Messages = ({ typeColor, message }) => {
    const alertCss = `alert alert-dismissible fade show ${typeColor}`
    return (
        <div className={alertCss} role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default Messages;