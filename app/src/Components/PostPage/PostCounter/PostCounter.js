import React, { useEffect } from 'react';

import getDataLogic from './PostCounterLogic.js';
//文章瀏覽(views)次數++
const PostCounter = () => {

        // const { userid } = useSelector(userSelector);
        //const { userid } = { id: 1 };
        //const [users, setUsers] = useState()
        const postId = 1;
        useEffect(() => {
                getDataLogic(postId).then(result => {
                        console.log(result.data)
                        //setUsers(result.data)
                })
        }, []);
        return <>
                {/* <Counter key={postId} postId={postId} /> */}

        </>;
};

export default PostCounter;

const Counter = props => {
        const { postId } = props;

        const handleClick = () => {
                getDataLogic(postId).then(result => {
                        console.log(result.data)
                        //setUsers(result.data)
                })
        };

        return (<button onClick={handleClick}>觀看components+1</button>);


}