import React from 'react';

//import des components
import BlockComments from './blockcomments/BlockComments';

const PostOption = (props) => {

    return (

        <BlockComments
            postId={props.postId}
        />
    );
};

export default PostOption;