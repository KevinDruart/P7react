import React, { useContext } from 'react';

import LoginContext from '../../../../contextes/LoginContext';

//import des components
import Comments from './comments/Comments';
import LikeDislike from './like/LikeDislike';

const PostOption = (props) => {
    const { userId } = useContext(LoginContext);
    const token = localStorage.getItem('authToken');

    return (
        <div className="post__options d-flex flex-column">
            <LikeDislike
                postId={props.post.id}
                userId={userId}
                token={token}
            />
            <Comments
                postId={props.post.id}
                userId={userId}
                token={token}
            />
        </div>
    );
};

export default PostOption;