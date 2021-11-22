import React, { useContext } from 'react';

import LoginContext from '../../../../contextes/LoginContext';

//import des components
import BlockComments from './blockcomments/BlockComments';

const PostOption = (props) => {
    const { userId } = useContext(LoginContext);
    const token = localStorage.getItem('authToken');

    return (

        <BlockComments
            postId={props.postId}
            userId={userId}
            token={token}
        />
    );
};

export default PostOption;