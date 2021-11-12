import React from 'react';

const Comments = (props) => {

        //Gestion de la date 
        const datePost = new Date(props.comment.time_comment);
        let postTime = datePost.toLocaleString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
    console.log(props);
    return (
        <div class="card" >
            <div class="card-header">
                {props.comment.name} {props.comment.firstname}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>{props.comment.comment}</p>
                    <footer class="blockquote-footer">{postTime}</footer>
                </blockquote>

            </div>
        </div>
    );
};

export default Comments;