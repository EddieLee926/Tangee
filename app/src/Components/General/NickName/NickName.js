//取得暱稱
import React, { useEffect, useState } from 'react';
import NickNameLogic from './NickNameLogic.js';

const NickName = (props) => {
    const { id } = props;
    const [users, setUsers] = useState();
    useEffect(() => {
        NickNameLogic(id).then((result) => {
            setUsers(result.data.nick_name);
            // console.log("nickname", result.data.nick_name)
        });
    }, []);

    return <>{users ? <div>{users}</div> : <div>使用者</div>}</>;
};
export default NickName;
